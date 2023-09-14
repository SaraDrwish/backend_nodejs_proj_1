const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
        required: true
    }, 
    lastName: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        required: true
    }, 
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8
    }
    ,
    isAdmin: {
        type: Boolean,
        default:false
    },
    tokens:[ {
        type: String,
        expires: "2d",
        trim:true
    }]

})

// قيمة محددة وعارفة القيم الي هتخش
// ,
//     role: {
//         type: String,
//         enum:["user" , "admin"]
//     }

userSchema.pre("save", async function(next) {
    
    try {
        if (!this.isModified("password")) {
            return next()
        }
        this.password = await bcrypt.hash(this.password, 8)
        next()
    }
    catch(error) {
        return next(error)
    }

})


const User = mongoose.model("user", userSchema)

module.exports = User




