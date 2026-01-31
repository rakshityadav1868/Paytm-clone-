const express=require("express")
const { authMiddleware } = require("../middleware")
const router = express.Router()

router.get("/balance",authMiddleware,async(req,res)=>{
    const acc= await Account.findOne({
        userid : req.userid,
    })
    res.json({
        balance: acc.balance
    })
})
module.exports=router
