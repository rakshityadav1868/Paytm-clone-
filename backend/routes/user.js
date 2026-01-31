const express = require("express");
const router =express.Router();
const {User}=require("../db.js"); //sirf user property access krni hai isliye aisa likha.{}
const zod =require("zod")

const signupschema= zod.object({
    username :zod.string().trim().min(8),
    password: zod.string().trim(),
    firstName: zod.string().trim(),
    lastName: zod.string().trim()
})

router.post("/signup",(req,res)=>{
    //safeParse krta hai jo bhi data phele direct schema ke through hoke jata abb vo signupschema ke through hoke jayega
    const {data}= signupschema.safeParse(req.body)
    if (!data){
        return res.status(411).json({message: "Email already taken/Invalid inputs"})
    }
    const existinguser= User.findOne({
        username:req.body.username
    })
    if(existinguser){
        return res.status(411),json({message: "Username already exists"})
    }

})
module.exports={
    Router
}