const express = require("express");
const app=express();
const router =require("./routes/index.js")
const cors = require("cors")

app.use(cors())
app.use(express.json())

// api/v1=route prefix
//this means jo bhi request /api/v1 se hogi usko router dedo
app.use("/api/v1",router)

app.listen(3000,()=>{
    console.log("serve started")
})
