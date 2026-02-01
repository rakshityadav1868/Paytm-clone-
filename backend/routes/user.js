const express = require("express");
const router =express.Router();
const {User, Account}=require("../db.js"); //sirf user property access krni hai isliye aisa likha.{}
const {z} =require("zod")
const {JWT_SECRET}=require("../config.js")
const {authMiddleware}=require("../middleware.js")
const jwt = require("jsonwebtoken");

//route for signup
const signupschema= z.object({
    username :z.string().trim(),
    password: z.string().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim()
})

router.post("/signup",async(req,res)=>{
    try {
        // safeParse krta hai jo bhi data phele direct schema ke through hoke jata abb vo signupschema ke through hoke jayega

        const {data}= signupschema.safeParse(req.body)
        if (!data){
            return res.status(411).json({message: "Email already taken/Invalid inputs"})
        }
        const existinguser= await User.findOne({
            username:req.body.username,
        })
        if(existinguser){
            return res.status(411).json({message: "Username already exists"})
        }
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userid = user._id.toString()  // Convert ObjectId to string
        await Account.create({
            userid,
            balance: 1 + Math.random() * 10000
        })
        const token = jwt.sign({
            userid
        },JWT_SECRET)

        res.json({message:"user created sucessfully", token})
    } catch(error){
        console.error("Error",error)
        return res.status(500).json({message: "error", error: error.message})
    }
})

// route for login 
const loginschema = z.object({
    username: z.string().email(),
    password: z.string().trim()
})

router.post("/signin",async(req,res)=>{
     const {data}= loginschema.safeParse(req.body)
     if (!data){
        return res.status(411).json({message:"Email does not exists"})
     }
     const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    const userid = user._id.toString()  // Convert ObjectId to string
    if (user){
    const token = jwt.sign({
        userid
    },JWT_SECRET)
    res.json({message: "login sucessful", token, username: user.firstName})
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

router.put("/",authMiddleware,async (req,res)=>{
    const {data}=updateuserschema.safeParse(req.body)
    if (!data){
        return res.status(411).json({messgae: "error while updating"})
    }
    await User.updateOne({_id:req.userid},data)
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
        users: users.map(user=>({
            username : user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// Logout route
router.post("/logout", authMiddleware, async (req, res) => {
    // In JWT, logout is handled on frontend by clearing the token
    // Backend just acknowledges the logout request
    res.json({
        message: "Logged out successfully"
    });
});

module.exports=router