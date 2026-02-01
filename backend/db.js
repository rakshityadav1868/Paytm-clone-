const mongoose = require("mongoose")

// Connect to MongoDB with proper error handling
mongoose.connect("mongodb://127.0.0.1:27017/paytm-app")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err))

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