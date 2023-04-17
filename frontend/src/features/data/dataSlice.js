
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import dataService from './dataService' //yazdığımız servisimizi burada import ederek içerisindeki fonksiyonlara sayfa içerisinde ulaşabiliyoruz


const initialState={
    notlar:[],
    isHata:false,
    isBasari:false,
    isYukleniyor:false,
    mesaj:''
}


export const notSlice=createSlice({
    name:'notlar',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
            builder
            .addCase(notOlustur.pending,(state)=>{
                state.isYukleniyor=true
            })
            .addCase(notOlustur.fulfilled,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=true
                state.notlar.unshift(action.payload)
            })
            .addCase(notOlustur.rejected,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=false
                state.isHata=true
                state.mesaj=action.payload
            })
            //TODO: notlar getir yüklenme aşamalarını yazacağız
            .addCase(notlarGetir.pending,(state)=>{
                state.isYukleniyor=true
            })
            .addCase(notlarGetir.fulfilled,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=true
                state.notlar=action.payload
            })
            .addCase(notlarGetir.rejected,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=false
                state.isHata=true
                state.mesaj=action.payload
            })
            .addCase(notSil.pending,(state)=>{
                state.isYukleniyor=true
            })
            .addCase(notSil.fulfilled,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=true
                state.notlar=state.notlar.filter((not)=>not._id !== action.payload.id)
            })
            .addCase(notSil.rejected,(state,action)=>{
                state.isYukleniyor=false
                state.isBasari=false
                state.isHata=true
                state.mesaj=action.payload
            })
    }
})

//thunkAPI.getState ile state lere erişim sağlayabilir.
//token ı sakladığımız state kısmına buradan erişeceğiz
//thunk oluşturduktan sonra exraReducer ımızı da oluşturacağız
export const notOlustur=createAsyncThunk('notlar/create',async(notData,thunkAPI)=>{
            try {
                const token = thunkAPI.getState().auth.kullanici.token
                //token verisinide aldığımıza göre notOluştur servisimize verilerimizig gönderebiliriz
                return await dataService.notOlustur(notData,token)    
                
            } catch (error) {
                const mesaj=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                return thunkAPI.rejectWithValue(mesaj)
            }
})


//notlar getir için servisimize bağlanaca thunk yapısı oluşturucağız sonrasında thunk yapısını slice yapısında kontrol edecek ve fonksiyon ve reducer ile state lere aktaracağoz
//state lere aktarılan bilgileri arayüzde kullanabiliyor hale geleceğiz
//thunk yapısında async fonksiyonunda ilk parametrede bizden veri istiyordu fakat şuan herhangi bir veri göndermeyeceğız onun için ilk parmaetreti boş geçeceğiz
//thunk a verdiğimiz ilk parametre data verisini servis istediği için veriyorduk
//servis bizden birde token istiyor fakat token verisine thunk yapısının içierinde thunkAPI ile ulaşacağız
export const notlarGetir=createAsyncThunk('notlar/getAll',async(_,thunkAPI)=>{
   
    try {
        const token = thunkAPI.getState().auth.kullanici.token
        return dataService.notlarGetir(token) // servisimizi burda çalıştırıyoruz //! servis bize bir data dönüyor onuda slice yapısında reducer ve fonksiyonlar ile state lere eşitliyoruz
    
    } catch (error) {
        const mesaj=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(mesaj)
    }
})


//notsilme işlemleri gerçekleşecek
export const notSil=createAsyncThunk('notlar/delete',async(id,thunkAPI)=>{

    try {
        const token=thunkAPI.getState().auth.kullanici.token

        return await dataService.notSil(id,token)
        
    } catch (error) {
        const mesaj=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(mesaj)
    }
  

})


export const {reset} =notSlice.actions

export default notSlice.reducer