//backend tarafında kullanıcı oluşturmuştuk oradan kıllanıcımızı alacağız 
//aldığğımız bilgiyi localstorage da tutacağız ve react tarfında bu bilgiye ulaşarak işlemler yapağız

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService"; //! api ile slice arasındaki veri alışverişini sağlayan servisimizi import ediyoruz.

 //localstorage da ki bilgiye ulaşıyoruz
const kullanici=JSON.parse(localStorage.getItem('kullanici')) //kullanici olarak oluşturduğumuz localstorage dan bilgimiz aldık 
//const kullanici=Cookies.get("kullanici")

 //kullanıcı bilgilerini aldığımıza göre initialstation oluşturacağız
//durum bilgilerinide kontrol edeceğimiz değişkenler oluşturcağız
//TODO: state oluşturuyoruz
 const initialState={
    kullanici:kullanici ? kullanici : null,
    isHata:false,
    isBasari:false,
    isYukleniyor:false,
    mesaj:''
 }

 //reducer dan önce api ye bağlanmak adına yazdığımız servisimizi thunk yapısı içerisinde çağıracağız ve çalışıtracağız
 //sonrasında thunk yapısını extraReducer içeirsinde tanımlamasını yapacağız 
 // extraReducer nedir ne zaman kullanılır nişin kullanılır sorularının cevaplarını vereceğiz.
 //cretateAsyncThunk yapısı önce isim adres alıyor sonrasında async çalışan bir callback çalışan bir fonksiyon alacak bu fonksiyonda parametre alıyor
 //extraReducer içerinde; yükleyiniyor yüklendi gibi durumları yakalama imkanı thunk işlemini kullanammaızdan kaynaklı olacak ve bu durumların neticesinde bazı işlemleri gerçekleştireceğiz
 //extraRedecer da yakalanan durumlar ile state düzenlenecek sonrasında güncel durumu ile state kullanılmış olacak

 //TODO: asyncThunk işlemleri
 export const register= createAsyncThunk('auth/register',async(user,thunkAPI)=>{
      try {
         //burada artık thunk yapısı içerinde önceden yazdığımız authServic imizi kullanacağız 
         return await authService.register(user)
      } catch (error) {
         const mesaj=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()

         return thunkAPI.rejectWithValue(mesaj)
      }
 })

// çıkış yapmak için bir fonksiyon yazacağız
// yazdığımız fonksiyon authService.js den gelen logout servisini çalıştıracak ve çıkış işlamlerimizi yapağız

export const logout= createAsyncThunk('auth/logout',async ()=>{
   await authService.logout()
})



//TODO: Slice oluşturduğumuz alan
//thunkApı ile hata yakalayabiliriz.
//user ile işlenecek data yakalanır
//try catch çalıştıracağız
export const login=createAsyncThunk('auth/login',async (user,thunkAPI)=>{
         try {
           return await authService.login(user)
         } catch (error) {
            const mesaj=(error.response && error.response.data && error.response.data.message) || error.message || error.toString()

         return thunkAPI.rejectWithValue(mesaj)
         }
})
//olumsuz bir durum oluşması anında bilgiyi sıfırlamak adına reset fonksiyonu oluşturacağız. state erişecek ve ilk haline getirecek
 export const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
            reset:(state)=>{
                state.isHata=false
                state.isBasari=false
                state.isYukleniyor=false
                state.mesaj=''
            }


    },

    //state i değiştireceğiz 
    //register.pending ->yüklenme durumunda. action almıyor herhangi bir payload yok
    //register.fulfilled -> yüklenme sonrası state ve action alıyor 
    //register.rejected -> hata durumunda kullanılacak durum belirtecidir. state ve action alıyor
    //addCase yapısında bu durumları thunk yapısı oluşturumamızdan dolayı yakalıyoruz ve callback fonksiyon kullanabiliyoruz
    //her bir durum için state deki verilerde değişkenlikleri sağlıyoruz

    //! extraReducer içerisinde login ile ilgili işlmeleri tekrar addcase de kontrol edeceğiz

    //! logout işlemini  sonunda sayfaların sağlıklı yönledimeler yapılabilmesi için logout fonksiyonumuzunda son çalışma anını yakalıyor ve state bilgimizi sıfırlıyoruz
    extraReducers:(builder)=>{
      builder
         .addCase(register.pending,(state)=>{
            state.isYukleniyor=true
      })
      .addCase(register.fulfilled,(state,action)=>{
            state.isYukleniyor=false
            state.isBasari=true
            state.kullanici=action.payload
      })
      .addCase(register.rejected,(state,action)=>{
            state.isYukleniyor=false
            state.isHata=true
            state.mesaj=action.payload
            state.kullanici=null

      })
      .addCase(login.pending,(state)=>{
         state.isYukleniyor=true
   })
   .addCase(login.fulfilled,(state,action)=>{
         state.isYukleniyor=false
         state.isBasari=true
         state.kullanici=action.payload
   })
   .addCase(login.rejected,(state,action)=>{
         state.isYukleniyor=false
         state.isHata=true
         state.mesaj=action.payload
         state.kullanici=null

   })
   .addCase(logout.fulfilled,(state)=>{
         state.kullanici=null
   })
    }
 })

 export const {reset} = authSlice.actions

 export default authSlice.reducer // oluşturduğumuz reducerımızı app klasöründe store.js de çağıracağız

 // store.js de ayarlardan sonra bir servis oluşturacağız ve bu serviste yazağımız fonksiyon ile apiye erişeceğiz
 // servisimizi features klasöründe auth klasörünün içierinde oluşturacağız