const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const authMiddleware = require('../middlewares/authenticationmw')
const userRoleMiddleware = require('../middlewares/userRolemw')


router.post('/addPost',authMiddleware,userRoleMiddleware(['user','editor']),postController.addPost)
router.get('/getPost/:id',authMiddleware,postController.getPost)
router.put('/updatePost',authMiddleware,postController.updatePost)
router.delete('/deletePost/:id',authMiddleware,postController.deletePost)
router.get('/showAllPosts',authMiddleware,postController.showAllPosts)

module.exports = router