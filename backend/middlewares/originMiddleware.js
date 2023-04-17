// sitelerden gelen istekleri site bazlı kısıtlamak için kullanılır
//controller bazlı siteleri ve crud işlemlerini kısıtlayabiliriz

//origin secenekleri
// { 
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

const whitelist = ['http://localhost:3000','http://localhost:54414']

const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) { // belirlediğimiz siteden gelen isteğe api yı açıyoruz
       debugger;
      corsOptions = { origin: true } // 
    } else {
      corsOptions = { origin: false } // sorguyu sonlandırıyoruz
    }
    callback(null, corsOptions) 
  }

//   module.exports={
//     corsOptionsDelegate
//   }


//---------------------------
const allowOrigins=require('../config/allowedOrigins')

const corsOptions={
  origin:(origin,callback)=>{
        if(allowOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }
        else{
          callback(new Error('Not Allowed by Cors'));
    }
  },
  optionsSuccessStatus:200
}

module.exports={
  corsOptions,
  corsOptionsDelegate
}