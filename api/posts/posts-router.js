// implement your posts router here
const express = require('express')
const { OPEN_READWRITE } = require('sqlite3')
const router = express.Router()
const Post = require('./posts-model')
router.get("/",(req, res) =>{
Post.find()
.then(posts=>{

    res.status(200).json(posts)
})
.catch(err=>{
    res.status(500).json({message:"The posts information could not be retrieved",error:err.message})
})
})
router.get("/:id",(req, res) => {
   Post.findById(req.params.id)
    .then((post)=>{
   if(post){
       res.status(200).json(post)
   }
   else{
       res.status(404).json({message:"The post with the specified ID does not exist"})
   }
    })
    .catch((err) => {
        res.status(500).json({message:"The post information could not be retrieved",error:err.message})
    })
})
router.post('/',async (req, res) => {
try {
    const newPost = await Post.insert(req.body)
    if(!req.body.title||!req.body.contents){
        res.status(400).json({message:"Please provide title and contents for the post"})
    }
    else{
        res.status(201).json(newPost)
    }
} catch (error) {
    res.status(500).json({message:"There was an error while saving the post to the database"})
}
})
router.put('/api/posts/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        try{
            const post = await Posts.update(req.params.id, req.body)
            if (!post) {
                res.status(404).json({
                message: "The post with the specified ID does not exist"
                })
            } else {
                const updated = await Posts.findById(req.params.id)
                res.status(200).json(updated)
            }
        } catch (err) {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        }
    }
})
// router.put("/:id", async (req, res) => {
//     try {
//         const update = await Post.update(req.params.id,req.body)
//         if(!req.body.title||!req.body.contents){
//             res.status(400).json({
//                 message:"Please provide title and contents for the post"
//             })
//         }
//         else{
//         if(update){
//         res.status(200).json(update)}
//         else{
//             res.status(405).json({message:"The post with the specified ID does not exist" })
//         }
//     }
//     } catch (error) {
//         res.status(500).json({message:"The post infomation could not be modified"})
//     }
// })

router.delete("/:id", async (req, res) => {
     try {
       const remove = await Post.remove(req.params.id)
       if(remove){
           res.status(200).json(remove)
      }
      else{
          res.status(404).json( {message: "The post with the specified ID does not exist"})
      }
    } catch (error) {
       res.status(500).json({message:"notworking"})
    }

})
router.get("/:id/comments",async(req, res) => {
    try {
        const getComments= await Post.findCommentById(req.params.id)
        if(getComments){
        res.status(200).json(getComments)}
        else{
            res.status(404).json({message:"The post with the specified ID does not exist"})
        }
    } catch (error) {
        res.status(500).json({message:"The comments information could not be retrieved"})
    }
})
module.exports = router