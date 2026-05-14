 require('dotenv').config()
const express = require("express");
const ConnectToDb = require("./config/db");
const authRouter = require("./routes/auth")
const taskRouter = require("./routes/Task")

ConnectToDb();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime()
    })
})
const StartServer = ()=>{
    try{
        app.listen(process.env.PORT||5000,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
            
        })
    }
    catch(error){
        console.log("Start Up error",error);
        
    }  
}
StartServer();