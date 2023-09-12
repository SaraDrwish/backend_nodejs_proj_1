const express = require("express");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();



app.use("/api" , routes )


const url = process.env.DB_CONNECTION_URL

console.log(url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => {
        console.log("database connected 5000 ")

})
    .catch(() => {
        console.log(error.message)
           }
    )



    
const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`the server is running on 3000 port ${port}`);
});

