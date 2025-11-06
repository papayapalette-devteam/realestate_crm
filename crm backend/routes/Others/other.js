const express = require("express");
const { login } = require("../../controllers/Others/sign_in");


const router=express.Router()



router.post("/sign-in",login);




module.exports=router