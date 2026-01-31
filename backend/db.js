const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patym-app")

const UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})

const User=  mongoose.model("User",UserSchema)

module.exports={
    User
}