const express=require("express");
const router=express.Router();
 const {createPost}=require("../controllers/postController");
 const {createComment}=require("../controllers/commentController");
 const {likePost,unlikePost}=require("../controllers/likeController");
 
router.post("/comment/create",createComment);
router.post("/post/create",createPost);
router.post("/post/like",likePost);
router.post("/post/unlike",unlikePost);
module.exports=router;