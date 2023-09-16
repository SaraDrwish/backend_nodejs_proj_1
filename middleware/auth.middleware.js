
const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
const jwt = require("jsonwebtoken")

const authentication = async(req, res, next) => {

    try {


        if (!req.cookies) {
             return res.status(401).send({
                message:"unauthorized user "
            })
        }


        let token = req?.cookies?.access_token?.split(" ")[1]
        const secretKey = process.env.SECRET_KEY
        let valid = await jwt.verify(token, secretKey)
        
        if (!valid) {
            return res.status(401).send({
                message:"unauthresed user "
            })
            
        }


        let user = await User.findById(valid.id)
        if (!user) {
             return res.status(401).send({
                message:" not a good  user "
            })
        }

        if (!user.tokens.includes(token)) {
            return res.status(401).send({
                message:" unauthresed and not a good  user "
            }) 
        }


        delete user.tokens
        delete user.password

        req.user = user 

        next()

        console.log(user)
        console.log(valid)

        // return res.send(token)

    }
    catch {
         logger.error(error.message)
         res.status(500).send({ message: error.message} )
        //  res.status(401).send({ message: error.message} )
    }


}

// /////////////////////////////////////////////////////////////////////////



const adminAuthorization = async (req, res, next) => {

    try {
        authentication(req, res, () => {
            if (!req.user.isAdmin) {
                 return res.status(403).send({
                 message:" unauthresed admin "
            }) 
            } else {
                next()
            }
        }) 

    }
    catch(error) {
         logger.error(error.message)
         res.status(500).send({ message: error.message} ) 
    }

}





module.exports = {
    authentication,
    adminAuthorization
};
