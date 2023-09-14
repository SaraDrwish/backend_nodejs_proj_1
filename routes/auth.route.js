const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.control")
const { newUserValidation , loginValidation } = require("../middleware/userValidation.middelware")


router.post("/login" , loginValidation , authController.login )
router.post("/signup" , newUserValidation , authController.newUser )


module.exports = router

