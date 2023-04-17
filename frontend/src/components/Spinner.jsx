// ? yükleniyor zamanında isYukleniyor=true olduğunda bir görsel göstereceğiz
//TODO: oluşturduğumuz spinnerımızı register.jsx sayfasında kullanacağız
import React from 'react'

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
        <div className='loadingSpinner'>

        </div>
    </div>
  )
}

export default Spinner