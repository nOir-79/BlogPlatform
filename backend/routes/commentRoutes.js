const express = require('express')
const router = express.Router()

const commentController = require('../controllers/comment')

router.post('/addComments',commentController.addComment)

router.post('/addReplies',commentController.addReplies)

router.get('/getComments/:postId',commentController.getComments)

router.get('/getReplies/:commentId',commentController.getReplies)

module.exports = router