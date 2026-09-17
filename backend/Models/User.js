
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
     resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  }
});
const userModel=mongoose.model('user',UserSchema);
module.exports=userModel;