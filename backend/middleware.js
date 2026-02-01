const {JWT_SECRET}=require("./config.js")
const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){
    const autheader= req.headers.authorization
    if (!autheader || !autheader.startsWith("Bearer")){
        return res.status(403).json({message: "No token provided"})
    }
    const token = autheader.split(" ")[1] //auth header = Bearer <token> toh apne ne usko split krke token le liye 
    try{
        const tokenverfication=jwt.verify(token,JWT_SECRET)
        req.userid=tokenverfication.userid      // tokenverification.userid se kya hoga ki token verify hone ke bdd user nikalenge orr http ko denge ki ha ye user hai
        next()
    }catch{
        return res.status(404).json({message: "Invalid token"})
    }
}
module.exports={
    authMiddleware
}