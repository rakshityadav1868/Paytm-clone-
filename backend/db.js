const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patym-app")

const UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})

// creating a account balance database
const accschema= new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})
const Account = mongoose.model("Account",accschema)
const User=  mongoose.model("User",UserSchema)

module.exports={
    User,
    Account
}