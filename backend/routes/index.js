const express = require("express");
const userrouter= require("./user")
const Router =express.Router();
const accountrouter=require("./account")

Router.use("/account",accountrouter)
Router.use("/user",userrouter)
module.exports=Router