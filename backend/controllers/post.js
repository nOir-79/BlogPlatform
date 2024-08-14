const Post = require('../models/post')
const User = require('../models/user')
const adminOperations = require('../controllers/adminOperation')
const user = require('../models/user')

exports.addPost = async(req, res)=>{
    try{
        const {title,content,author} = req.body
        const post = new Post({
        title:title,
        content:content,
        author:author
        })

        await post.save()
        res.status(201).send({post})
    }catch(err)
    {
        console.error(err)
        res.status(401).send("Error adding post")
    }
   

}

exports.getPost = async(req, res)=>{
    try {
        console.log('Inside getPost')
        const id = decodeURIComponent(req.params.id)
        console.log(id)
        const post = await Post.findOne({_id:id})

        if(!post)
        {
            res.status(400).send('Post not found')
        }
        res.status(201).send({post})
    }catch(error)
    {
        console.error(error)
        res.status(500).send("Don't know what happened")
    }
}

exports.updatePost = async (req,res) =>{
    try{
        const {id,updatedPost} = req.body
        const post = new Post({
        title: updatedPost.title,
        content:updatedPost.content,
        author: updatedPost.author
    })

        const updated = Post.findOneAndUpdate(id,updatedPost,{new:true})

        if(!updated)
        {
            return res.status(404).send('Post not found');
        }
        res.send(updated)
    }catch(error)
    {
        res.status(500).send(error.message);
    }
}

exports.deletePost = async(req, res)=>{
    try{
        const id = decodeURIComponent(req.params.id)
        
        const result = await Post.deleteOne({_id: id})

        if(result.deletedCount == 0)
        {
            return res.status(404).send("The post is not found")
        }

        return res.status(200).send('The item is deleted')
    }catch(error){
        console.error(error)
        res.status(500).send('Something is wrong')
    }
}

exports.showAllPosts = async(req, res)=>{
    try{
        const posts = await Post.find()
        if(!posts)
        {
            return res.status(404).send('There are no posts')
        }
        return res.status(200).json(posts)
    }catch(error){
        return res.status(500).send('Internal Server Error')
    }
}