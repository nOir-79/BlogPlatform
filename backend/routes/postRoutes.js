const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')


router.post('/addPost',postController.addPost)
router.get('/getPost/:id',postController.getPost)
router.put('/updatePost',postController.updatePost)

module.exports = router