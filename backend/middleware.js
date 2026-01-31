const JWT_SECRET=require("./config.js")
function authMiddleware(req,res,next){
const autheader= req.header.authorization
if (!autheader || !autheader.startsWith("Bearer")){
    res.status(403).json({})
}
const token = autheader.split('')[1] //auth header = Bearer <token> toh apne ne usko split krke token le liye 
try{
    const tokenverfication=jwt.verify(token,JWT_SECRET)
    req.userid=tokenverfication.userid      // tokenverification.userid se kya hoga ki token verify hone ke bdd user nikalenge orr http ko denge ki ha ye user hai
}catch{
res.status(404).json({})
}
next()
}
module.exports={
    authMiddleware
}