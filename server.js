const express = require("express")
const app = express()
const routes = require("./routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require("dotenv").config()

app.use(express.json())
app.use(cookieParser())
app.use("/api/blog" ,  express.static("./uploads"))

app.use("/api", routes)

// const crypto = require("crypto")
// console.log("cryptooooo " + crypto.randomBytes(16).toString("hex"));

const url = process.env.DB_CONNECTION_URL
// console.log(url)
mongoose.connect( url , {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=> {
        console.log("database connected by sara !! ")
})
.catch((error)=> {
        console.log(error.message)      
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} by sara `);
});


