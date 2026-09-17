
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login ,forgotPassword,resetPassword} = require('../Controllers/AuthController');

const router=require('express').Router();


router.post('/signup',signupValidation,signup)
router.post('/login',loginValidation,login)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
module.exports=router


// cdzq ccif jfln dgzo