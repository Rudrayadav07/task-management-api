 require('dotenv').config()
const express = require("express");
const ConnectToDb = require("./config/db");
const authRouter = require("./routes/auth")


ConnectToDb();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/api/auth', authRouter)

app.get("/api/health",(req,res)=>{
    res.send("check karo")
        res.json({
            Status:"ok",
            uptime:process.uptime()
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