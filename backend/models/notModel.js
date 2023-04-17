const mongoose=require('mongoose')

const notSchema=mongoose.Schema({ // sonradan kullanici şemasını oluşturduk ve kullanici şemasını burada kullanacağız. notun hangi kullanıcı taradından olışturulduğunu göreceğiz
    kullanici:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Kullanicis' // kullanıcıModelde export ederken Kullanicis verdiğimiz için yazdık.
    },
    baslik:{
        type:String,
        require:[true,'Lütfen not başlığını giriniz']
    },
    aciklama:{
        type:String,
        require:[true,'Lütfen not açıklamasını giriniz']
    },
    oncelik:{
        type:Number
    }
},{
    timestamps:true // veri tabanına yazma işlemlerinde otomatik olarak tarih alanları gelecek
})

module.exports=mongoose.model('Not',notSchema) // Nots ismiyle şema oluşacak bu oluşan şema notSchema yı kullanacak