const express=require("express")
const { authMiddleware } = require("../middleware")
const router = express.Router()
const {Account} = require("../db.js")
const mongoose = require("mongoose")

// where user gets the balance
router.get("/balance",authMiddleware,async(req,res)=>{
    const acc= await Account.findOne({
        userid : req.userid,
    })
    if (!acc) {
        return res.status(404).json({
            message: "Account not found"
        })
    }
    res.json({
        balance: acc.balance
    })
})

//transfer money to another accc
//transfer money logic
//transfer money logi
// need to understand transfer logic

router.post("/transfer", authMiddleware, async (req, res) => {
    const { to, amount } = req.body;

    try {
        // Validation
        if (!to || !amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid transfer data"
            });
        }

        // Sender account (from JWT token)
        const senderAccount = await Account.findOne({
            userid: req.userid
        });

        if (!senderAccount) {
            return res.status(400).json({
                message: "Sender account not found"
            });
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Receiver account
        const receiverAccount = await Account.findOne({
            userid: to
        });

        if (!receiverAccount) {
            return res.status(400).json({
                message: "Receiver account not found"
            });
        }

        // Deduct from sender
        await Account.updateOne(
            { userid: req.userid },
            { $inc: { balance: -amount } }
        );

        // Add to receiver
        await Account.updateOne(
            { userid: to },
            { $inc: { balance: amount } }
        );

        res.json({
            message: "Transfer successful"
        });

    } catch (err) {
        console.error("Transfer error:", err);
        res.status(500).json({
            message: "Transfer failed"
        });
    }
});
module.exports=router
