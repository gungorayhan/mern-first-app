import React,{useEffect,useState} from 'react'

import {useNavigate} from 'react-router-dom'
//sayfalarda state ve action lara erişmek adına her isinide import ediyoruz
import {useSelector,useDispatch} from 'react-redux'

import NotForm from '../components/NotForm'
//notları göstereceğimiz componenetide yüklüyoruuz
import Not from '../components/Not'
//notlar yüklenirken gösreceğiz
import Spinner from '../components/Spinner'

//TODO: kayıtlı notlarımızı dashboard sayfasında göstereceğiz. notları geetirmek adına yazdığımız thunk yasposında ki fonksiyonumuz kullanacağız
import {notlarGetir,reset} from '../features/data/dataSlice'

function Dashboard() {
      const navigate = useNavigate()
      const dispatch=useDispatch()
      const {kullanici} = useSelector(state=>state.auth)
      const {notlar,isYukleniyor,isBasari,isHata,mesaj} =useSelector(state=>state.notlar)


      useEffect(()=>{
        if(isHata){
          console.log(mesaj);
        }

        if(!kullanici){
          navigate('/login')
        }

        dispatch(notlarGetir())

        return ()=>{
          dispatch(reset())
        }

        if(isYukleniyor){
          <Spinner/>
        }

      },[kullanici,navigate,isHata,mesaj,dispatch])
  return (<>
    <section className='heading'>
        <h1>Merhaba {kullanici && kullanici.kullaniciAd}</h1>
    </section>
    <NotForm/>
    <section className='content'>
      {notlar.length >0 ?(
        <div className='notlar'>
          {notlar.map((not)=>(
              <Not key={not._id} not={not} /> 
            ))}
        </div>
      ):(
        <h3> Henüz Not Girmediniz</h3>
      )}

    </section>
    </>
  )
}

export default Dashboard