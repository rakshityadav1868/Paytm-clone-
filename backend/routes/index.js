const express = require("express");
const userrouter= require("./user")
const Router =express.Router();

Router.use("/user",userrouter)
module.exports=Router