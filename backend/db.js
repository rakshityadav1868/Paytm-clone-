const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.DATABASE_URL;
console.log(process.env.DATABASE_URL);
if (!MONGO_URL) {
  throw new Error("DATABASE_URL is not defined");
}

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

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