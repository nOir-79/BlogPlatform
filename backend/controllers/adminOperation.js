Posts = require("../models/post")

exports.showAllPosts = async ()=>{
    try{
        const allPosts = await Posts.find()
        if(!allPosts)
        {
            return -1
        }
        return allPosts
    }catch(error){
        return -1
    }
}