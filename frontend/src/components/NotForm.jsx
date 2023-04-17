import React,{useState} from 'react'

// notOlustur dataSlice ı burada kullanacağız
//fonksiyon ve datalara ulaşmak adına gerekli importları yapmalıyız
import {useDispatch} from 'react-redux'

//dataSlice içierindeki notOlustur fonsiyonuna ulaşıyoruz
import {notOlustur} from '../features/data/dataSlice'



function NotForm() {
//formdan gelen verileirmizi burada yakalıyoruz sonrasında onsubmit içerinde kullanıyoruz. 
//formlardan gelen veriler değişkenlere atanıyor değişkenlerdeki verilerde onsubmit içerisinde çekiliyor 
const [baslik,setBaslik] = useState('')
const [aciklama,setAciklama]=useState('')
const [oncelik,setOncelik]=useState(1)

const dispatch= useDispatch()

const onSubmit=(e)=>{
    e.preventDefault();
    console.log('onSubmit ile yakalanan veriler:' + baslik,aciklama,oncelik);
    dispatch(notOlustur({baslik,aciklama,oncelik}))

    //ardından değişkenlerimizi eski haline getimeliyiz
    setBaslik('')
    setAciklama('')
    setOncelik(1)
}

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='baslik'>NOT BAŞLIK:</label>
            <input type="text" id="baslik" name="baslik" value={baslik} onChange={(e)=>setBaslik(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='aciklama'>Not Açıklama:</label>
          <input type='text' id='aciklama' name='aciklama' value={aciklama} onChange={(e)=>setAciklama(e.target.value)} />
        </div>
        <div className='form-group'>
            <label htmlFor='oncelik'>Not Öncelik:</label>
            <select value={oncelik} onChange={(e)=>setOncelik(e.target.value)}>
              <option value='1'>Az Öncelikli</option>
              <option value='2'>Öncelikli</option>
              <option value='3'>Çok Öncelikli</option>
            </select>
        </div>
        <div>
          <button type='submit' className='btn btn-block btn-add'>Kaydet</button>
        </div>

      </form>

    </section>
  )
}

export default NotForm