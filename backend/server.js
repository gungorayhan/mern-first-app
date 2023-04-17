const express=require('express');



const dotenv=require('dotenv').config()


// hata yakalama fonksiyonumuzu middleware yapısı ile çalıştıracağız onun için çaığırıyoruz
const {hataYakalama}=require('./middlewares/errorMiddleware');

//veri tabanına bağlama fonksiyonunu çağıracağız. mongodb atlas
const baglan=require('./config/db')
//logger middleware
const {Logger} = require('./middlewares/loggerMiddleware');

//cors middleware import

const credentials=require('./middlewares/credentials');
const {corsOptionsDelegate}=require('./middlewares/originMiddleware')
const cors =require('cors')

// colors eklentisini çağıracağız
const colors = require('colors')
// hangi portu dinleyeceğiz
const PORT=process.env.PORT; 

// express bir fonksiyon döndürüyor ve bizde onu fonksiyon olarak tanımlıyoruz
const app=express(); 
-
//logger
app.use(Logger)


// cors middleware// istekte bulunan web sitelerinin filtrelendiği yer


// var corsOptions = {
//      origin: 'http://localhost:3000',
//      optionsSuccessStatus: 200
// }
//app.use(credentials); // refresh token kullanımında onaylama site berlirteci durumlarında hata vermemesi için yapılmaktadaır

app.use(cors(corsOptionsDelegate)) //gelen istekler belirlenen sitelerden ise serverın çalışması devam etsin eğer değil ise durdurulsun


app.use(express.urlencoded({extended:true}));
app.use(express.json()); //urlencoded ile beraber çalışıyor gelen verileri json a çeviriyor.


// örnek cors kullanımı
//app.use('api/notlar',cors(corsOptionsDelegate),require('./routes/notRoute')) belirli modelller belirli kişiler veya web istekleri tarafından kullanılır
app.use('/api/notlar/',require('./routes/notRoute'));
app.use('/api/kullanicilar',require('./routes/kullaniciRoute'));
app.use('/api/refreshToken',require('./routes/refreshToken'))
app.use(hataYakalama) //hiç bir yere yönlenmiyor ise hata alacaktır

baglan()// veri tabanına bağlanıyor

app.listen(PORT, ()=>console.log(`Server ${PORT} üzerinden yayında`.magenta.italic)) // port değeri ve callback fonksiyon kullandık