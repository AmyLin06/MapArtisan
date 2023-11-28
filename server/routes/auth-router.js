const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.put('/update', AuthController.updateUser)
router.put('/upload',AuthController.uploadPicture)

module.exports = router
