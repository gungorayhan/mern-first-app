const express=require('express')

const router=express.Router();

// controller dosyasından gelenler
const {getNotlar, setNotlar, updateNotlar,deleteNotlar} =require('../controllers/notController');

//kullanıcı kontrolü burada kullanacağım eğer token var ise ilgili controller a yönledirilecek. middleware işlemlerin çalışma prensibi
const{kullaniciKontrol}=require('../middlewares/authMiddleware') // yönlendirme eğer buraya token geliyorsa yapılacak
//kullanıcı bazlı işlemlerde kullanılacak


//yönledirmelerin yapzıldığı alan
router.get('/',kullaniciKontrol,getNotlar);
router.post('/',kullaniciKontrol,setNotlar);
router.put('/:id',kullaniciKontrol,updateNotlar);
router.delete('/:id',kullaniciKontrol,deleteNotlar);

// zincirleme router oluşturma yapısı örnek kodlar

//router.route('/').get(getNotlar).post(setNotlar);
//router.route('/:id').put(updateNotlar).delete(deleteNotlar);    


module.exports=router;