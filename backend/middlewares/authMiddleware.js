// bu middle ware oluşturmadaki amacımız 
//tokenin varlığını kontrol edeceğiz eğer var ise çözüp ona göre kullanıcnın id si ile kulanıcıyı yakalacağız
//kullanıcnın id ile kullanıcılar modelinden kullanıcıyı getireceğiz 
// böylelikle token a bağlı olarak kullanıcının bilgisini yakalayacağız
//ayrı middleware katmanında yapmamaızın sebebi her yerden login işleminde oluşmuş bir token ı not ekleme işlemlerinde kullanmış olacağız


// öncelikle register ve login işlemleri esnasında env de ki gizli kelime ve şifre kullanılarak bir token oluşturuyoruz.
//sonrasında ilgili token headers kısmına kayıtlanıyor.
// bizde kullanıcıyı getirmek adına giriş yaperken oluşan token ı burada ters işlem yaparak çözümlüyoruz
//çözümlenen token sonrasında kullanıcı id sini bulmuş olduk sonrasında kullanıcı id ile kullanıcı bilgilerini getiriyoruz
//token var mı yok mu işlemleri de yapılarak olası hatalar gideriliyor.
//token olması durumunda autoMiddleware den sınra gelen fonksiyonlarımızı kullanabilir hala geliyoruz.
//req.user içiersine kullanıcı bilgilerini atıyoruz. uygulamanın req parametresini kullandığımız fonksiyonlarından re.user diyerek kullanıcı bilgilerine ulaşıyoruz

const jwt = require('jsonwebtoken')

const asyncHandler=require('express-async-handler')

const Kullanici=require('../models/kullaniciModel')

//kullanıcıyı kontrol etmek adına bir foknsşyon oluşturuyoruz

const kullaniciKontrol=asyncHandler(async(req,res,next)=>{

    //token bilgilerine headers içerisnden erişeceğiz ve token ımız  Bearer ile mi başlıyor kontolü sağlanacak
    let sifrelenmisToken;
    // eğer token süremiz doldu ise refres tokun ile oturum yenilenerek tekrar refresh token vermeliyiz ve işleme devam etmeliyiz
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //TOKEN VAR İSE ve BEARER TOKUN İSE İŞLEMLER GERÇKELŞEECEK

        try {
            sifrelenmisToken=req.headers.authorization.split(' ')[1];// boşluğa göre böldük 2. indexte token vaR.BEARER İLE GELEN TOKENIMIZI SPLİT İLE İŞLEM PARAK ALIYORUZ
            const token=jwt.verify(sifrelenmisToken,process.env.JWT_SECRET)// token ve env de şifrelemek için olşuturudupumuz kelimeyi veriyoruz ve token ı çözüyoruz.
            //token çözümününden geriye kullanıcı id si çıkacak ve token.id diyerek ulaşacağız
            req.user=await Kullanici.findById(token.id).select('-parola')//user ı bulduk. önce kullanıcıyı buluyoruz SONRASINDA PAROLASI DOĞRUMU KONTROL ETTİKtEN SONRA NEXT İLE DEVAM EDİYORUZ
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error('Giriş Yapılamaz')
        }
    }

    //sifrelenmiToken boş gelir ise
    if(!sifrelenmisToken){
        res.status(401)
        throw new Error('Giriş Yapılamaz Token Bulunamadı')
    }

})

module.exports={
    kullaniciKontrol
}