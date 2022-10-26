const express=require("express");
const amzonmodule=require('../modules/amzonmodule')
const router= express.Router();
router.get('/get',amzonmodule.getamazondetails);

module.exports=router;