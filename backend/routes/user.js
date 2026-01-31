const express = require("express");
const router =express.Router();
const {User, Account}=require("../db.js"); //sirf user property access krni hai isliye aisa likha.{}
const {z} =require("zod")
const JWT_SECRET=require("../config.js")
const {authMiddleware}=require("../middleware.js")

//route for signup
const signupschema= z.object({
    username :z.string().trim().email(),
    password: z.string().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim()
})

router.post("/signup",async(req,res)=>{
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    await Account.create({
        userid,
        balance: 1 + Math.random() * 10000
    })
    const userid=user._id
    const token = jwt.sign({
        userid
    },JWT_SECRET)

    res.json({messgae:"user created sucessfully"})

})

// route for login 
const loginschema = z.object({
    username: z.string().email(),
    password: z.string().trim()
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


// to update user information
const updateuserschema=z.object({
    username: z.string().trim().optional(),
    password: z.string().trim().optional(),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional()
})

router.put("/",authMiddleware,async (res,req)=>{
    const {data}=updateuserschema.safeParse(req.body)
    if (!data){
        res.status(411).json({messgae: "error while updating"})
    }
    await User.updateOne({_id:req.id})
    res.json({message:"user updated sucesfully"})
})

// to get username from backend whike filtering 
router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || ""; // || "" isliye kyuki regex ko undefined psnd nhi hai orr req.query.filter se jo type kr rhe hai vo nikal rhe hai databse se
    // ye mql ka syntax hai need to learn 
     const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user=>{
            username : user.username;
            firstName: user.firstName;
            lastName: user.lastName;
            _id: user._id
        })
    })
})
module.exports=router