const express=require('express')
const{refreshToken}=require('../controllers/refreshController');
const router=express.Router();



router.get('/',refreshToken);

module.exports=router;