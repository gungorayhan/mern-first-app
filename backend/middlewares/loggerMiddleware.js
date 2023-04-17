//log tuttmak için bir middleware oluşturuyoruz
//req ile yakaladığımız verileri bir txt dosyasına yazıyoruz
//tabi bir model oluşturarak veri tabanına da yazabiliriz ve sonrasında kayıtların analizlerini yapmak işimizi kolaylaştıracaktır
const fs=require('fs')
const Logger=(req,res,next)=>{
 
    const log=(`${req.method} - ${req.path}- ${req.headers.origin} - ${req.url} - ${req.hostname}`)
   
    //console.log(req.protocol)
    fs.appendFile("request_logs.txt", log + "\n", err => {
     if (err) {
       console.log(err);
     }
   });
     next();
}

module.exports={
    Logger
}