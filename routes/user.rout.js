const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user.control")
const auth = require("../middleware/auth.middleware")


router.route("/:id").delete(auth.adminAuthorization  ,  userCtrl.deleteUser)

module.exports = router

