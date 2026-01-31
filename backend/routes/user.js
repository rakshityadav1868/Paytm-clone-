const express = require("express");
const router =express.Router();
const {User}=require("../db.js"); //sirf user property access krni hai isliye aisa likha.{}
const zod =require("zod")
const JWT_SECRET=require("../config.js")

const signupschema= zod.object({
    username :zod.string().trim().email(),
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
    const user =User.create({
        username: req.body.username,
        password: req.body.password,
        firstNmae: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userid=user._id
    const token = jwt.sign({
        userid
    },JWT_SECRET)

    res.json({messgae:"user created sucessfully"})

})

const loginschema = zod.object({
    username: zod.string().email(),
    password: zod.string().trim()
})

router.post("/signin",(req,res)=>{
     const {data}= loginschema.safeParse(req.body)
     if (!data){
        res.status(411).json({message:"Email does not exists"})
     }
     const user =User.create({
        username: req.body.username,
        password: req.body.password,
    })
    const userid=user._id
    if (user){
    const token = jwt.sign({
        userid
    },JWT_SECRET)
    res.json({message: "login sucessful", token})
    return // return krna jruri hai kyuki second response bhejne ki try krega toh function khtm krne ke liye jruri hai
    }
res.status(411).json({
    message: "error while logging in"
})
})
module.exports=router