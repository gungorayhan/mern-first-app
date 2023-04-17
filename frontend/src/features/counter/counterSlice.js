

import {createSlice} from "@reduxjs/toolkit"


//bu alanda veriyi initial içerinde el ile kendimiz dolduruyoruz
// sonrasında oluşturulan slice yapısında actionlar sayasinde üzerinde değişiklik yapıyoruz
//herhangi bir extraReducer yapısı veya api ye bağlanan ve bize veri dönene servisi yazmıyor sonrasında bu serviside thunk yapısı içinde kullanımını yapmıyoruz
//thunk yapısının çalışma aşamlarına görede extraReducer yapısını kullanarak initialState de hernagi bir düzenleme yapmıypruz
//tüm işlemlerimizi manul yaptığımız bir yapıya örnek oluşturuyorruz 
//yukarıda bahsedilen örneklerimizi auth klasöründeki yapımızda kullanıyoruz 


const initialState={
    value:1
}

export const counterSlice=createSlice({
    name:'counter',
    initialState:initialState,
    reducers:{
        //reducerlarımızı oluşturuyoruz.
        //state bilgisi initialStateden gelecek
        //action bilgisi ise vereceğimiz değeri yakalamadık adına kullanıyoruz. payload bilgisini yakalamak adına 
        topla:(state)=>{
            state.value+=1
        },
        cikar:(state)=>{
            state.value-=1;
        },
        //action dışarıdan bir bilgi girdiğimizde yakalamak adına olutşuruyoruz
        degereGoreTopla:(state,action)=>{
                state.value+=action.payload
        }
    }

})

//oluşturulan reducerlara dışarıda erişmek adına export edeceğiz
//counterSlice.action.fonksiyın ismi diyerek import edilen yerden ulaşabiliriz

export const{topla,cikar}=counterSlice.actions

export default counterSlice.reducer

// artık store içerinden counterSlice ekleyeceğiz ve oradan ulaşır hala geleceğiz