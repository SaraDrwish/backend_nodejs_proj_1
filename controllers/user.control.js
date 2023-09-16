const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")

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
    }


}


module.exports = userController 