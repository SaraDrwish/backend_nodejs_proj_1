const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {

    newUser: async(req,res)=>{
        try {
            logger.info(req.body)
            let data = req.body

            let duplicatedEmail = await User.findOne({email:data.email}) 
            if (duplicatedEmail) {
                res.status(400).send({
                    message:"this email is already existed "
                })
                let newUser = new User(data)
                await newUser.save();
                res.status(201).send({message:"account is done"})
            }
        }
        catch (error) {
            logger.error(error.message)
            res.status(500).send({ message: error.message} )
        }
    },



    login:async(req, res) => {
            try {
                logger.info(req.body)
                let {email , password} = req.body

                let user = await User.findOne({ email }) 
                if (!user) {
                    return res.status(403).send({message:"invalid email or password"} )
                }

                let validPassword = await bcrypt.compare(password , user.password  )
                console.log(validPassword)

                  if (!validPassword) {
                    return res.status(403).send({message:"invalid email or password  validPassword "} )
                } 

                let secretKey = process.env.SECRET_KEY                    
                let token = await jwt.sign({ id: user._id },secretKey)
        

                res.cookie("access_token", `Berear ${token}`, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 2
                    
                } )

                console.log(token)
                res.send()                
            }
            catch (error) {
               logger.error(error.message)
               res.status(500).send({ message: error.message} )
            }
    }


}
    

module.exports = userController;

