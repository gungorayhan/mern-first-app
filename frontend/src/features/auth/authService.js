// axios ile apiye bağlanarak bilgliri getireceğiz
//react-toastify ile uyari işlmelerini yapacağız
// url tanımlanacak 
// axis ile veri getirilecek
//aslında burada kontrolü kolay olması adına bir fonksiyon yazıyoruz ve bir başka sayfamızında bu fonksiyonu kullanamak adına import edeceğiz orada import edilen fonksiyona aldığı kullanici değerini göndereceğiz
// fonksiyon verilen bilgiler doğrultusunda localstorage dolduracak bir thunk işlemi sonrasında 
//thunk işlemi bitmesinin ardından slice yapısı devreye griecek ve slice yapısı sayesinde actionlarımız çalışacak ve reducerımızı çalışacak
// bunca çalışan fonksiyonlar sonrasın kontrollerimiz sağlanacak. yapılan kontrolller sonrasında kullanıcının ulaşamak istedği sayfalar gösterilecek
//thunk işleminide exraReducer içerinde çağıracaağız ve çalıştıracağız

//! buraya yazılan servis fonksiyonlarımız server.js deki api ile react slice yapıları arasında veri alışverişinde köprü görevi görmektedir

import axios from "axios"

import Cookies from "js-cookie"
import { useSelector } from "react-redux"


// ana bir url belirlenecek

const API_URL='/api/kullanicilar/' // sever tarafında oluşturduğumuz api url ni kullanacağımız için aynı ismi verdik. kullaniciRoute.js e yönlendirerel oradaki controllera gitmemizi sağlayacak

const register=async (kullaniciData)=>{
    const response = await axios.post(API_URL,kullaniciData)

    // response.data dolu dönüyor ise localstorage dolduracağız
    if(response.data){
        localStorage.setItem('kullanici',JSON.stringify(response.data))
        //Cookies.set("kullanici",response.data)
    }
}

//çıkış işlemleri yapcağımız fonskyionu yazıyoruz
const logout=()=>{
        localStorage.removeItem('kullanici')
        //Cookies.remove('kullanici')

}

//TODO: login işlmelerimizde api ve slice arasında veri transferi yapacak servisimizi yazacağız
//axios url ve data giriyoruz 
//login sonrasında gelen bilgi localstorage a json formatında kaydediliyor
const login = async(kullaniciData)=>{
            const response=await axios.post(API_URL+'login',kullaniciData)

            if(response.data){
                    localStorage.setItem('kullanici',JSON.stringify(response.data))
                    //Cookies.set("kullanici",response.data)
            }

            return response.data
}





//export işlemleri için servis fonksiyonlarımızı paket haline getiriyoruz
const authService={
    register,
    logout,
    login,
   
}

export default authService