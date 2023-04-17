import React,{useState,useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

//redux kullanacağımızdan dolayı importlarımızı gerçekleştiriyoruz
import {useSelector,useDispatch} from 'react-redux'

//başarılı bir şekkilde register sonrası yönlenme işlemi yapılacak
import {useNavigate} from 'react-router-dom'

//uyari mesajı için 
import {toast} from 'react-toastify'

// işlmeleri gerçekleştireceğimiz reset ve regester fonksiyonlarını export etmiştik şimdide importlarını bu sayfada gerçekleştireceğiz
import {register,reset} from '../features/auth/authSlice'

//spinner kullnacağımız için bir import ediyoruz
import Spinner from '../components/Spinner'


function Register() {

    //navigate ve dispacth tanımlayacağım

    const navigate=useNavigate();
    const dispatch=useDispatch();

    //useSelector ilede auth daki state te erişeceğiz
    const {kullanici=null,isHata,isBasari,isYukleniyor,mesaj} =useSelector(state=>state.auth)

    //test verileri
    // const kullanici=null;
    // const isHata=false;
    // const isBasari=false
    // const isYukleniyor=false;
    // const mesaj=''
    




    const [formData,setFormData]=useState({
        kullaniciAd:'',
        email:'',
        parola:'',
        parolaKontrol:''
    })
    const {kullaniciAd,email,parola,parolaKontrol}= formData; //setFormData ile değiştiridiğimiz formData verisini tekrar useState i güncelelemek için kullanıyoruz

    const onChange=(e)=>{//onChange fonksiyonu ile inputların içerinde değişiklik oldukca çalışacak ve 
        //setFormData yı çalıştıracak. setFormData onceki diye bir parametre alıyor ve ...onceki yazım şekliyle formData içerisindeki verileri geitiriyor
        //gelen formData verilerini onchange den gelen parametrede değişen inputtaki veriyii yakalayarak değişim işlemini yapıyoruz

            setFormData((onceki)=>({  // setFormData ile form data fonksşyonunu değiştireceğiz
                ...onceki,
                [e.target.name]:e.target.value

            }))
    }

    const onSubmit=(e)=>{
        e.preventDefault() // form gönderildikten sonra varsayılan olan form yenileme özelliğini kaldırıyoruz
        //console.log(formData);
        if(parola !== parolaKontrol){
            toast.error('Parola Eşleşmedi')
        }else{
            const userData={
                kullaniciAd,email,parola
            }
            //thunk da tanımladığımız register 
            //verdiğimiz userData authService.js de ki fonksiyona iletilecek oradan apiye veri beslenecek
            //register işlemleri ardından yönleirmeler için useEffect i kullnacağız
            dispatch(register(userData))
        }

    }

    //useeffect(()=>{},[bu kısıma yazdığım değerlerde bir değişiklik olması durumunda tetiklenecek])
    useEffect(()=>{

        //isHata doldurulmuş ise
        if(isHata){
            toast.error(mesaj)
        }

        //isHata yok ise gerçekleşecek işlemler 
        if(isBasari || kullanici){
            //yönlerime yapıyoruz
            //bir diğer önemli olay ise kullanici dolduruldu ise bir daha bu register sayfasına giriş yapamayacağız 
            //çünkü register olmuştuk ve bir daha register olamayız 
                navigate('/')
        }

        // iki kontrolede takılmadı ise reset fonksiyonunu çalıştıracağız
        dispatch(reset())

    },[kullanici,isHata,isBasari,mesaj,navigate,dispatch])

    //spinner ı burada çağırıyoruz isYukleniyor true ise gösterilecek

    if(isYukleniyor){
        <Spinner/>
    }

return <>
  <section className='heading'>
    <h1>
        <FaUser/>Üyelik Oluştur
    </h1>
  </section>
  <section className='form'>
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <input type="text" className='form-control' id='kullaniciAd'
            name='kullaniciAd' value={kullaniciAd} placeholder='Kullanıcı Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-group'>
            <input type="email" className='form-control' id='email'
            name='email' value={email} placeholder='Email Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='parola'
            name='parola' value={parola} placeholder='Parola Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-group'>
            <input type="password" className='form-control' id='parolaKontrol'
            name='parolaKontrol' value={parolaKontrol} placeholder='Parola Tekrar Adı Giriniz' onChange={onChange}/>
        </div>
        <div className='form-control'>
            <button type='submit' className='btn btn-block'>Üye Ol</button>
        </div>

    </form>
  </section>
  </>
}

export default Register