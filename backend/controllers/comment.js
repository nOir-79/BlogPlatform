const Comment = require('../models/comment')
const Post = require('../models/post')

exports.addComment = async(req,res)=>{
    try{
        console.log(req.body)
        const {content,userId,postId} = req.body
        console.log(content)
        console.log(userId)
        console.log(postId)

        const comment = new Comment({
        content : content,
        author: userId,
    })
        await comment.save()
        const updatePost = await Post.findByIdAndUpdate(postId,{$push:{comments:comment._id}})
        res.status(200).send('The comment has been added')
    }catch(error){
        res.status(500).send('Internal server error')
    }
}

exports.addReplies = async(req,res)=>{
    try{
        const {content,userId, commentId} = req.body
        const reply = new Comment({
            content: content,
            author: userId
        })
    
        await reply.save()
    
        await Comment.findByIdAndUpdate(commentId,{$push:{replies: reply._id}})
        res.status(200).send('Reply has been added')
    }catch(error){
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
    
}

exports.getComments = async(req, res)=>{
    try{
        const postId = req.params.postId
        const comments = await Post.findById(postId).populate('comments')

        res.status(200).send(comments)
    }catch(error){
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

exports.getReplies = async(req,res)=>{
    try{
        const commentId = req.params.commentId
        const replies = await Comment.findById(commentId).populate('replies')
        console.log(replies)
        res.status(200).send(replies)
    }catch(error){
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}