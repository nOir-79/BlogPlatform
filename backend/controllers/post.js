const Post = require('../models/post')

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