const express = require("express")
const router = express.Router()
const controller = require('../controllers/authentication')

router.post('/register', controller.register)
router.post('/login',controller.login)
router.get('/getUser/:username',controller.getUserInfo)



module.exports = router
