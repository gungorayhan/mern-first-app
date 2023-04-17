//app klasörü açtık sonrasında store js açtık ve redux toolkitti yapılandırmanın işk adımlaını atmış olduk

import {configureStore} from "@reduxjs/toolkit" // bir store oluşturacağız

//slice ları import edeceğiz
//import counterReducer from "../features/counter/counterSlice" // ismini reducer olarak veriyoruz yorum satırı yaparak örneğimizi sonlandırıyoruz

import authReducer  from '../features/auth/authSlice'
import notlarReducer from '../features/data/dataSlice'



// burada store oluşturduk . bunu kullanmak iiçin ise src klasöründe index dosyasında import edeceğiz
//oluşturulan reducerlarımız burada toplayarak index dosyasında rolprovider sayasinda app üzeinde dağıtacağız
export const store=configureStore({ 
    reducer:{
        //counter:counterReducer
        auth:authReducer,
        notlar:notlarReducer
    }
})

