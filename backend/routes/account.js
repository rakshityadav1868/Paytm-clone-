const express=require("express")
const { authMiddleware } = require("../middleware")
const router = express.Router()

// where user gets the balance
router.get("/balance",authMiddleware,async(req,res)=>{
    const acc= await Account.findOne({
        userid : req.userid,
    })
    res.json({
        balance: acc.balance
    })
})

//transfer money to another accc
//transfer money logic
 
module.exports=router
