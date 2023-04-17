import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

//herhangi bir sayfada uyarı mesajı verdirmek adına react-toastify eklentisini uygulamamıza yapılandırmasını yapacağız
//router dan sonra return içerisine eklenecek
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//import { useSelector, useDispatch } from "react-redux" //useSelector ile statelere erişebilmek için kullanacağız.useDispatch ilede actionlar için kullanacağız.

//import {girisYap,topla,cikar} from "./actions/index" // reduz toolkitten önceki kullanım kodları

 //import Counter from './features/counter/counter'; // gösterim sayfamızı burada çağırıyoruz
 


function App() {
  
 // const giris=useSelector(state=>state.giris) // girisReducer daki state e ulaşıyoruz. useSelector detaylı izle!!!!!!!!!!!!!!
  //const hesapla =useSelector(state=>state.hesapla) //hesaplaReducer daki state e ulaşıyoruz

  // const dispatch=useDispatch(); //useDispatch ten türeme yapıyoruz redux toolkitten önce buradan ulşaamya çalıştığımızdan doılayu  burada çağırıoytus



  return (
    <>
   
    <Router> {/* sayfa yöneldirmelerini yapacağız */}
  <div className='container'>
  <Header/>
  <Routes>
  <Route path='/' element={<Dashboard/>}/>
  <Route path='/register' element={<Register/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='*' element={<Navigate to="/" replace />}/>{/* olmayan bir sayfaya gidilmeye çalışıldığında yönlendirileceği 
                                                            sayfa burası oalcaktır.Burada 
                                                            yönlendirilen sayfada api ile haberleşiilerek log tutulabilir 
                                                            denemeler hangi zamanda hangi api den hangi uzantı aranmaya çalışıldığına dair  */}
</Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );


//redux toolkitten önce
// return(
// <div className='App'> 
//   {giris ? ( // true ? "Doğru":"Yanlış"  yazım tekniği ile  if bloğu oluşturuyoruz!!! giris?(<></>):(<></>) gibi
//     <>
//     {hesapla}
//     <button onClick={()=>dispatch(topla(20))}>+</button>
//     <button  onClick={()=>dispatch(cikar(10))}>-</button>
//     </>
//   ):(
//     <>
//     <h1>Lütfen Giriş Yapınız</h1>
//     <button  onClick={()=>dispatch(girisYap())}>Giriş</button>
//     </>

//   )}
// </div>
// )

//reduX toolkitten sonra 

// return (
//   <div>
    
//    <div>
//     <Counter/>
//    </div>
//    </div>
// )

}



export default App