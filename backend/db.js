const mongoose = require("mongoose")
require("dotenv").config();


const dbConnection = async () =>{
    await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("DB CONNECTED");
    });
}

module.exports  = dbConnection

