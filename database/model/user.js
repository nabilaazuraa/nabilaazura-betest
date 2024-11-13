const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
      id:String,
      userName:String,
      accountNumber:String,
      emailAddress:String,
      identityNumber:String,
})
const user=mongoose.model("user",userSchema);
module.exports=user;