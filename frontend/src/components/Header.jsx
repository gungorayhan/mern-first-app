import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser,FaPen} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

// kullancağımız fonksiyonu burada çağıracağız
import{logout,reset} from '../features/auth/authSlice'


function Header() {
      const navigate=useNavigate();
      const dispatch=useDispatch();

      const {kullanici} = useSelector(state=>state.auth)

      //butona basıldıktan sonra tetiklenecek bir fonksiyon oluşturuyorum
      //tetiklenmesi sonrasında içerisindeki fonksiyonlar sırayla çalışacaklar.sırayla çalışmalarının sebebi asyncThunk yapısında çalışmalarıdır
      const onLogout=()=>{
        dispatch(logout()) // cookies deki kullanıcı  bilgilerinide sıfırlıyoruz ki program initialState verisini buradan almasın
        dispatch(reset())//initialState deki kullanici state ini sıfırlıyoruz.Sayfa yenileme yapmadan ekranda gerekli değişiklikler olacaktır
        navigate('/login')// sonrasında yönlendirme işlemlerini yapıyoruz
      }
      


  return (
    <header className='header'>
        <h2>Not uygulaması</h2>
        <div className='logo'>

        </div>
        <ul>
          {kullanici ? (
          <>
            <li>
                <Link to="/"><FaPen/>Not Oluştur</Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt/>Logout
                </button>
            </li>
          </>
          ):(
          <>
            <li>
              <Link to="/login"><FaSignInAlt/>Giriş</Link>
            </li>
            <li>
                <Link to="/register" ><FaUser/>Üye ol</Link>
            </li>
          </>
          )}
            
            
        </ul>
    </header>
  )
}

export default Header