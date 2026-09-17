const crypto = require("crypto");
const transporter = require("../Config/mail");
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const UserModel = require("../Models/User");
const { response } = require('express');
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{
try{
    const {name,email,password}=req.body;
    const user=await UserModel.findOne({email});
    if (user){
        return res.status(409)
        .json({message:'Useris already exist, you can login',success:false})
    }
    const userModel=new UserModel({name,email,password});
    userModel.password=await bcrypt.hash(password,10);
    await userModel.save();

    res.status(201)
    .json({
        message:"Signup Successfully",
        success:true
    })
}
catch (err){
  res.status(500)
    .json({
        message:"Internal Server Error",
        success:false
    })
}
}


const login=async(req,res)=>{
try{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if (!user){
        return res.status(403)
        .json({message:'Auth failed, Email or Password wrong',success:false})
    }
    const isPassEqual=await bcrypt.compare(password,user.password)
    if(!isPassEqual){
         return res.status(403)
        .json({message:'Auth failed, Email or Password wrong',success:false})
    }
    const jwtToken=jwt.sign(
        {email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}

    )
    res.status(200)
    .json({
        message:'Login Success',
        success:true,
        jwtToken,
        email,
        name:user.name
    })
}
catch (err){
  res.status(500)
    .json({
        message:"Internal Server Error",
        success:false
    })
}
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

  const resetToken = crypto.randomBytes(32).toString("hex");

const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

        await user.save();
await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    text: `Click this link to reset your password:

${resetUrl}

This link will expire in 10 minutes.`
});
        return res.status(200).json({
            message: "Password reset link generated",
            success: true
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset link",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
module.exports={
    signup,login,forgotPassword,resetPassword
}