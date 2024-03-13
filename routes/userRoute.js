const express = require("express");
const {
  LoginController,
  RegisterController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
//Login || Post
router.post('/login',LoginController);


//register || post
router.post('/register', RegisterController);

// router.post('/getUserData' , authMiddleware , authController);

module.exports = router;
