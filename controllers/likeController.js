const Post=require("../models/postModel");
const Like=require("../models/likeModel");
exports.likePost=async (req,res)=>{
    try{
    //fetch data from the body
    const {post,user}=req.body;
    //here is another way of saving data in db
    const like=new Like({
        post,user,
    });
    //save like in db
    const savedLike=await like.save();
    //ab hme post wale db ke ander change karna hai ki ha iss post pe like hua hai aur phi jo naya
    //findandupdate do operator pehla post ki id liya hai jisko wo find karega then uske likes array ko is like se update karega
    const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
    .populate("likes")
    .exec();
    
    res.json({
        post:updatedPost,
    });
    }
    catch(error){
       return res.status(500).json({
        error:"error while liking blog",
       })
    }
}  
//unlike a post
exports.unlikePost= async (req,res)=>{
    try{
        const{post,like}=req.body;
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});
        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});
        res.json({
            post:updatedPost,
        });
    }
    catch(error){
        return res.status(400).json({
            error:"error while unliking post",
        })
    }
}