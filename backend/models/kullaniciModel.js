const mongoose=require('mongoose')

const kullaniciSchema=mongoose.Schema({
    kullaniciAd:{
        type:String,
        require:[true,'Lütfen kullanici adını giriniz']
    },
    email:{
        type:String,
        require:[true,'lütfen email adresini giriniz'],
        unique:true
    },
    parola:{
        type:String,
        require:[true,'Lütfen parola giriniz']
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model('Kullanicis', kullaniciSchema)