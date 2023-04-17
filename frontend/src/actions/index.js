// tüm actionları burada toplayacağız
// buradaki actionları farklı js dosyalarında yazmamız ve gelen type bilgilerinide başka dosyalara ayırarak oralardan çekmeliydik. kod karmaşasından kaçınmalıyız. 
// fonksiyonları ve içerindeki bileşneleri parçalayarak yönetmeliyiz.
// buradaki actionları ilgili sayfalarda import ederek kullanıyoruz.
// type larına bakılarak reducer ları harekete geçiriyorlar
// harekete geçen reducer state üzerinde değişiklikler yapıyor
//reduz toolkitten önce kullanıdğımız yöndem redux yönetimi
//action ve reduc klasörleri ile kurulan yapı redux-toolkit in slice yapısı sonrasında çalışmayacak
export const girisYap = ()=>{
    return {
        type:'SIGN_IN',
    }
}

export const topla=(sayi)=>{
    return {
        type:'TOPLA',
        payload:sayi
    }
}

export const cikar=(sayi)=>{ // parametre alarak payload ı dolduruyoruz
    return{
        type:'CIKAR',
        payload:sayi
    }
}