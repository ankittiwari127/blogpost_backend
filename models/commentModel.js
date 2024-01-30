const mongoose=require("mongoose");
//route handler
const commentSchema=new mongoose.Schema({
   //here we know  kis post pe comment kiya hai
    post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
   } ,
   //kisne comment kiya
   user:{
    type:String,
    required:true
   },
   //kya comment kiya
   body:{
    type:String,
    required:true
   }
});
module.exports=mongoose.model("comment",commentSchema);