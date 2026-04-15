const mongoose = require("mongoose");

async function ConnectToDb(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    }
    catch(error){
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = ConnectToDb;
