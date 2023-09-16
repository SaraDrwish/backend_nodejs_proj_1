const { validate } = require("../models/user.model");
const {newUserSchema , loginSchema } = require("../services/userValidation.service");

const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("user")


function newUserValidation(req, res, next) {
    try {
        let { error } = newUserSchema.validate(req.body)
            if(error){
                let errorMsg = error.details[0].message
                logger.warn(errorMsg)
                return res.status(403).send({message:errorMsg})
        }
        next()
     }
    catch (error) {
        return res.status(500).send({
            message:error.message
        })
    }
}


function loginValidation(req, res, next) {
    try {
        let { error } = loginSchema.validate(req.body)
            if(error){
                let errorMsg = error.details[0].message
                logger.warn(errorMsg)
                return res.status(403).send({message:errorMsg})
        }
        next()
     }
    catch (error) {
        return res.status(500).send({
            message:error.message
        })
    }
}



module.exports = { newUserValidation  , loginValidation}


