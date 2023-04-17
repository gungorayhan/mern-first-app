//yazacağımız serviste auth bilgisinide kullanarak işlemler yapacağız
//kullanıcı eğer giriş yaptıysa vb. kullanıcı bazlı işlemler 
//öncelikle axis import edilecek sonrasın api_url tanımlanacak

import axios from 'axios'

const API_URL= '/api/notlar/'


//TODO: api ile iletişime geçerken daha önce sadece data gönderiyorduk şimdi bir token göndereceğiz. header alanını kullanacağız

const notOlustur= async(notData,token)=>{
    //header alanını axios ile kullanabilmek için 3. parametrede bir config ayarı yapmamız gerekiyor

    const config ={
        headers:{
            Authorization:`Bearer ${token}`

        }
        
    }

    //api nin istediği bilgileri göndermiş olduk
    const response = await axios.post(API_URL,notData,config)  
         
    //gelen cevabı return ediyoruz
    return response.data
}

//TODO: not getirme servisimizi yazcağız ve burada yine token kullanacağız çümkü api bizden bearee token istiyor

const notlarGetir=async(token)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response= await axios.get(API_URL,config)

    return response.data
}

const notSil = async(notId,token)=>{
    const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await axios.delete(API_URL+notId,config)
            return response.data
}




//?servislerimizi export ediyoruz

const dataService={
    notOlustur,
    notlarGetir,
    notSil
}

export default dataService