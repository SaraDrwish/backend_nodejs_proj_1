const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
const bcrypt = require("bcryptjs")


const userController = {

    deleteUser: async (req, res) => {
        
        try {
            logger.info((req.params))
            // logger.info((req.body))
            // let {email , password} = req.body
            let { id } = req.params

            await User.findByIdAndDelete(id)

            res.send({ message: "deleted the id and the account has been deleted " })
        }
         catch (error) {
            logger.error(error.message)
            res.status(500).send({ message: error.message} )
             
        }

    },
    userUpdate: async (req, res) => {
        try {
            if (req.file) {
                var image = `/api/user/${req.file.filename}`
            }
            let user = await User.findByIdAndUpdate(req.user._id, { ...req.body, image }, { new: true })
            res.send(user)
        }
        catch (error){
            logger.error(error.message)
            res.status(500).send({ message: error.message} )  
        }

    },
    
    updatePassword:async (req,res) =>{
        try {
            let { newPassword, oldPassword, rePassword } = req.body
            let user = await User.findById(req.body._id)
            let validPassword = await bcrypt.compare(oldPassword , user.password)
            if (!validPassword) {
                return res.status(403).send({message:"invallid old password "})
            }
            user.password = newPassword
            await user.save()
            user.send({message:"password updated !! "})

        } catch (error) {
            logger.error(error.message)
            res.status(500).send({ message: error.message} )  
        }

    }
    ,
    getUser: async (req, res) => {
        try {
            let user = await User.findById(req.body._id)
            res.send(user)
            
        }catch (error) {
            logger.error(error.message)
            res.status(500).send({ message: error.message} )  
        }


    }


}


module.exports = userController 