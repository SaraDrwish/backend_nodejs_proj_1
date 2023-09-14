const Joi = require("joi")

const newUserSchema = Joi.object({
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    email: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required() ,
})


const loginSchema = Joi.object({
       email: Joi.string()
        .required(),
       password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required() ,

})




module.exports =  { newUserSchema , loginSchema } 
