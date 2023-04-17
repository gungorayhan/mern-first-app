//bu model üzerinden veri tabanıyla işlemler yapacağız
const Kullanici=require('../models/kullaniciModel')
//veri tabanı ile asenkron işlemleri gerçekleştrimemizse yarar
const asyncHandler =require('express-async-handler')
//şifrelemede kullanılacak eklenti
const bcrypt=require('bcryptjs')

//require('crypto').randomBytes(64).toString('hex')-> konsolda node diyerek node.js tarafına bu kod yardımı ile secret string oluşturabiliriz
//wen token oluşturmak için önce require edeceğiz ve bir fonksiyon oluşturacağız.
const jwt= require('jsonwebtoken')

const tokenOlustur=(id)=>{//Kullanıcı id sine göre token oluşturacazğız. bize bir web token dönecek.dönen token ı react js tarafında yakalayabiliriz ve yapılan işlemlerde kullanabiliriz

    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'}) // 3 parametre alıyor kullanıcının idsi, .env de özel bir metin ve token nekadar süre kalacak

}


const registerKullanici=asyncHandler(async (req,res)=>{
    const {kullaniciAd,email,parola}=req.body;

    // bunlardan birinin boş gelmesi duruumunda 
    if(!kullaniciAd || !email || !parola){
        res.status(400)
        throw new Error('Lütfen gerekli alanları doldurunuz')
    }

    // kullaniciModel de belirttiğimiz üzre var olan bir email ile kayıt olmaya çalışıyor ise
    //öncellikle veri tabanından Kullanici modeli getirecğiz

    const kullanici=await Kullanici.findOne({email})

    if(kullanici){
        res.status(400)
        throw new Error('Bu email zaten var')
    }

    //kullanıcının şifreisni şifreleyerek kaydediyoruz.önce zorluk derecesini belriteceğiz sonra praloyu şifreleyeceğiz
    const salt = await bcrypt.genSalt(10)  // şifrenin zorluk derecesini oluşturuyoruz. varsayılan 10
    const sifrelenmisParola = await bcrypt.hash(parola,salt) //parolamızı zorluk derecesine göre şifreliyoruz

    //kullanıcı oluşturacağız

    const yeniKullanici = await Kullanici.create({//kullanıcı oluşturulduktan sonra yeniKullanici değişkenine bilgiler aktarılacak
        kullaniciAd,
        email,
        parola:sifrelenmisParola
    })

    //yeni kullanıcı oluşmasının ardından işlemler 

    if(yeniKullanici){
       
        res.status(201).json({ // create işleminden dolayı 201
            _id:yeniKullanici.id,
            kullaniciAd:yeniKullanici.kullaniciAd,
            email:yeniKullanici.email,
            token:tokenOlustur(yeniKullanici._id)
        })
    }else{
        res.status(400)
        throw new Error('Gçersiz Kullanıcı Verisi')
    }

    res.json({mesaj:`kullanıcı register işlemleri`})

})

const loginKullanici=asyncHandler(async(req,res)=>{
    const {email,parola} = req.body; // kullanicidan yani formdan gelen bilgileri yakalıyorum

    const kullanici = await Kullanici.findOne({email}) //Kullanici modeli kullanarak email varmı bakıyorum

    //parola eşleşşiyormu kontrol edeceğim. burada kullanıcıdan aldğımız paraolayı tekrar şifreleyerek db şifreli olan parola ile eşleştireceğiz
    if(kullanici && (await bcrypt.compare(parola,kullanici.parola))) // bycrpt.compare sayesinde karşılaştorma yapıyoruz
    {
        //eşleşme var ise
        res.json({
            _id:kullanici.id,
            kullaniciAd:kullanici.kullaniciAd,
            email:kullanici.email,
            token:tokenOlustur(kullanici._id)
            
        })
    }else{
        res.status(400)
        throw new Error('Geçersiz email yada parola')
    }
})

const getKullanici=asyncHandler(async(req,res)=>{
    //oncelikle kullanıcı ile giriş yapıyorur. autoMiddleware ile bir token oluşuyor.
   const {_id,kullaniciAd,email} = await Kullanici.findById(req.user.id) //autoMiddleware çalıştığında req.user dolduruluyor. sonra next diyerel getkullanici çalışıyor artık getkulalnci içersinde bizde req.user.id de kullanıcın id sine erişiyoruz

   res.status(200).json({
    id:_id,
    kullaniciAd,
    email
   })
})

module.exports={
    registerKullanici,
    loginKullanici,
    getKullanici
}