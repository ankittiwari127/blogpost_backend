const Post=require("../models/postModel");
const Comment=require("../models/commentModel");
exports.createComment=async (req,res)=>{
    try{
    //fetch data from the body
    const {post,user,body}=req.body;
    //here is another way of saving data in db
    const comment=new Comment({
        post,user,body
    });
    //save comment in db
    const savedComment=await comment.save();
    //ab hme post wale db ke ander change karna hai ki ha iss post pe comment hua hai aur phi jo naya
    //comment hai use uske comment array ke ander update kr denge
    //findandupdate do operator pehla post ki id liya hai jisko wo find karega then uske comments array kois comment se update karega
    const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
    .populate("comments")
    // if we do not write populate then we only get the id of that person who comments not what he comment
    .exec();
    res.json({
        post:updatedPost,
    });
    }
    catch(error){
       return res.status(500).json({
        error:"error while creating comment",
       })
    }
}  