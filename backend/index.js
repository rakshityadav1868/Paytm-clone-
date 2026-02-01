require('dotenv').config();
const express = require("express");
const app=express();
const router =require("./routes/index.js")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// api/v1=route prefix
//this means jo bhi request /api/v1 se hogi usko router dedo
app.use("/api/v1",router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
