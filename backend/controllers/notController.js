const asyncHandler=require('express-async-handler') // veri tabanıyla asenkron ,ilemler gerçekleştirmede kullanıyoruz

const notModel=require('../models/notModel')

//kullancını bazlı silme ve güncellem işlemlerinde kullaniciModeli kulalanacağız
const kullaniciModel=require('../models/kullaniciModel')




const getNotlar=asyncHandler(async (req,res)=>{
    const notlar=await notModel.find({kullanici:req.user.id}).sort({createdAt:-1}) //!sort sonrada sıralama amaçlı kullanıldı->-1=desc // giriş yapan kullanıcın notlarını getirecek. kullanici bilgisi req.user dan alınıyor
    // buradaki dikkat edilmesi gereken nokta ise notları kaydederken kullanıcı bazlı kaydetmemizden dolayı sonrasında kullanıcı bazlı getirme imkanımız oluyor.
    //yine kullanıcı bazlı kaydederken giriş yapan kullanıcıdan bilgiler alarak kaydediyoruz.req.user.id
    res.status(200).json(notlar)
})

const setNotlar=asyncHandler(async (req,res)=>{ // gelen değerlerde mesaj var mı yokmu kontrollleri de yapılıyor
    if(!req.body.baslik || !req.body.aciklama){
        res.status(400)
        throw new Error('Lütfen başlık ve açıklama alanlarını giriniz')
    }

    const not=await notModel.create({
        baslik:req.body.baslik,
        aciklama:req.body.aciklama,
        oncelik:req.body.oncelik,
        kullanici:req.user.id
    })

    res.status(200).json(not)

})

const updateNotlar=asyncHandler(async (req,res)=>{
    //önce hangi not güncellenecek onu bulacağız

    const not = await notModel.findById(req.params.id)

    const kullanici= await kullaniciModel.findById(req.user.id) //kullanıcıyı çağırık hemen arkasında if ile kullanıcı var mı yok mu kontol ettik
    if(!kullanici){
        res.status(400)
        throw new Error('Kullanici Bulunamadı')
    }



    if(!not){
        res.status(400)
        throw new Error('Not bulunamadı')
    }

    // kullanıcıModel ve req.userid kullanarak giriş yapan kullanıcımızın bilgilerini veri tabanından çağırdık
    //şimdi ise nottaki id ile giriş yapan kullanıcının id sinin eşleşme durumu kontrol edilecek ve işlme gerçekleşecek
    if(not.kullanici.toString()!==kullanici.id){ // toString yapmamaızın nedeni -> notlar içierindne kullanici idsini object olarak tutmamız
        res.status(400)
        throw new Error('Kullanici Yetkili Değil')
    }


    const guncellendi=await notModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json(guncellendi)

})

const deleteNotlar=asyncHandler(async (req,res)=>{
    const not=await notModel.findById(req.params.id)

    const kullanici= await kullaniciModel.findById(req.user.id) //kullanıcıyı çağırık hemen arkasında if ile kullanıcı var mı yok mu kontol ettik
    if(!kullanici){
        res.status(400)
        throw new Error('Kullanici Bulunamadı')
    }

    if(!not){
        res.status(400)
        throw new Error('not bulunamadı')
    }

     // kullanıcıModel ve req.userid kullanarak giriş yapan kullanıcımızın bilgilerini veri tabanından çağırdık
    //şimdi ise nottaki id ile giriş yapan kullanıcının id sinin eşleşme durumu kontrol edilecek ve işlme gerçekleşecek
    if(not.kullanici.toString()!==kullanici.id){ // toString yapmamaızın nedeni -> notlar içierindne kullanici idsini object olarak tutmamız
        res.status(400)
        throw new Error('Kullanici Yetkili Değil')
    }

    await not.remove() // tüm kontrollleri geçtikten sonra ilgili notun yetkili yani oluşturanı ise silme işlemlerini gerçekleştirebileceğiz
    res.status(200).json({id:req.params.id}) //mesajın id sini döndürüyoruz. proje sonu ayarlaması
})




module.exports={
    getNotlar,
    setNotlar,
    updateNotlar,
    deleteNotlar
}