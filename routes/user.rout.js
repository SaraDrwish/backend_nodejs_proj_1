const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user.control")
const auth = require("../middleware/auth.middleware")


router.route("/:id").delete(auth.adminAuthorization, userCtrl.deleteUser)

router.use(auth.authentication)

router.post("/logout" , userCtrl.logout)

router.route("/")
    .get(userCtrl.getUser)
    .patch(userCtrl.userUpdate)


router.post("/update/password" , userCtrl.updatePassword) 

    
    
    
    
module.exports = router

