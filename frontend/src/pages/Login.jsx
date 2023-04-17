
import React,{useState,useEffect} from 'react'
import {FaUserCheck} from 'react-icons/fa'

//state ve actons lara erişmek için importları gerçekleştireceğiz
import {useSelector,useDispatch} from 'react-redux'

//yönleirme işlmeleri için navigate
import {useNavigate} from 'react-router-dom'

//uyari vermek için react-toastify
import {toast} from 'react-toastify'

//kullanacağımız actionları import edeceğiz
import {login,reset} from '../features/auth/authSlice'

//spinner ımızı kullanacağız
import Spinner from '../components/Spinner'

function Login() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {kullanici,isHata,isBasari,isYukleniyor,mesaj}=useSelector(state=>state.auth)

    const [formData,setFormData] = useState({
        email:'',
        parola:'',
    })

    const {email,parola}= formData

    const onChange=(e)=>{
        setFormData((onceki)=>({
            ...onceki,
            [e.target.name]:e.target.value
        }))
    }

    //? onsubmit tetiklenidğinde login metodunu çağıracağız ve bilgiyi servisimi ordanda apiye iletecek
    // öncelikle yakaladığımız data mızı oluşturaacazğız ve sonrasında göndereceğiz
    const onSubmit=(e)=>{
        e.preventDefault()

        const userData={
            email,
            parola
        }

        dispatch(login(userData))
        
    }

    //TODO: useEffect ile hata var ise veya başarılı ise işlemleri yapacağız
    useEffect(()=>{
        if(isHata){
            toast.error(mesaj)
        }

        if(isBasari || kullanici){
            navigate('/')
        }

        dispatch(reset())

    },[kullanici,isHata,isBasari,isYukleniyor,mesaj,navigate,dispatch])

    if(isYukleniyor){
        <Spinner/>
    }
  return<>
   <section className='heading'>
    <h1>
        <FaUserCheck/>
    </h1>
  </section>
  <section className='form'>
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <input type="email" className='form-control' id='email'
            name='email' value={email} placeholder='Email Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='parola'
            name='parola' value={parola} placeholder='Parola Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-control'>
            <button type='submit' className='btn btn-block'>Giriş</button>
        </div>

    </form>
  </section>
  </>
}

export default Login