const hataYakalama=(err,req,res,next)=>{ // server.js de çağıracağım

    // öncelikle status kodum ne geldi onu belirliyorum
    const statusKod=res.statucCode ? res.statusCode : 500

    res.status(statusKod)

    res.json({
        mesaj:err.message,
        aciklama:process.env.NODE_ENV==='production' ? null : err.stack //.env adresinde belirlediğimiz kontrol durmunu burada çağırarak kullanıyoruz
    })

}

module.exports={
    hataYakalama
}