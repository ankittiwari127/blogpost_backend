const mongoose=require("mongoose");
//route handler
const likeSchema=new mongoose.Schema({
   //here we know  kis post pe like kiya hai
    post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
   } ,
   //kisne like kiya
   user:{
    type:String,
    required:true
   },
   //kya comment kiya
   
});
module.exports=mongoose.model("like",likeSchema);