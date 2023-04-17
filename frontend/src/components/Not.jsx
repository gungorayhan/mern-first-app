import React from 'react'

import {useEffect,useState} from 'react'

import {FaWindowClose} from 'react-icons/fa'

import {useDispatch} from 'react-redux'

import {notSil} from '../features/data/dataSlice'
//not datasını props olarak göndereceğimiz var sayıyoruz
//not fonksiyonuna object data gönderiyoruz
function Not({not}){
    //! oncelikli durumu bir text olarak tutmak istediğimizden dolayı aişağıdaki işlemleri yapacağız ve oncelikli durumu bir text olrak çevireceğiz
    const [oncelikText,setOncelikText]=useState('')
    const dispatch=useDispatch()
    useEffect(()=>{

        switch (not.oncelik) {
            case 1:
                setOncelikText('Az Öncelikli')
                break;
            case 2:
                setOncelikText('Öncelikli')
                break;
            case 3:
                setOncelikText('Çok Öncelikli')
                break;
            default:
                break;
        }
    
    },[])
   
    //notSil fonksiyonunu tetikletmek amaçıyla onDelete fonksiyonu oluşturuyoruz ve buton altında tetikleteceğiz
    const onDelete=(id)=>{
        dispatch(notSil(id))
    }
    

  return (
    
    <div className='not'>
        <div>
            {new Date(not.createdAt).toLocaleDateString('tr-TR')}
            <h2>{not.baslik}</h2>
            <p>{not.aciklama}</p>
            <p>{oncelikText}</p>
            <button className='close' onClick={()=>onDelete(not._id)}><FaWindowClose/></button>
        </div>

    </div>
  )
}

export default Not