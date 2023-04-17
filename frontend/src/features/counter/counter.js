// gösterim için yine burada bir dosya olultuurucağız

import React from 'react'

// useSelector -> state erişmek için
//eseDispatch -> actionlara ulamak için kullanacağız
import {useSelector, useDispatch} from 'react-redux'

//actionlarımızı da import edeceğiz
import {topla,cikar} from './counterSlice'

//öncelikle state bilhisine ulaşacağız ve kullanıcılarımıza state bilgisini gösteceğiz tabi bunların hepsini fonksiyon içeribde yapcağız


function Counter() {

    const count=useSelector(state=>state.counter.value) // buradki counter counterSlice da verdiğimiz name kısmı 
    const dispatch=useDispatch(); // dispatch bir fonksiyon dönmesinden dolayı burada bu şekilde çağırıyopruz dispatch(topla()) gibi olacak

  return(
    <div>
        <div>
            <button onClick={()=>dispatch(topla())}>TOPLA</button>
            <span>{count}</span>
            <button onClick={()=>dispatch(cikar())}>ÇIKAR</button>

        </div>
    </div>
  )
}

export default Counter