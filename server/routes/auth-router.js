// const express = require("express");
// const router = express.Router();

// router.post("/user", (req, res) => {
//   res.sendStatus(200);
// });

// module.exports = router;

const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)

module.exports = router
