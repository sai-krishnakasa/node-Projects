const jwt=require('jsonwebtoken')
const User=require('../models/User')


const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    // check jwt cookie exists and verify it
    if(token){
        jwt.verify(token,'secret to sign token',(error,decodedToken)=>{
            if(error){
                console.log(error.message);
                res.redirect('/login')
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

//check current user

const checkUser=(req,res,next)=>{
    const token = req.cookies.jwt;
    console.log('Token',token)
    if(token){
        jwt.verify(token,'secret to sign token',async (error,decodedToken)=>{
            if(error){
                console.log(error.message);
                res.locals.user=null;
                next();
            }
            else{
                console.log(decodedToken);
                let user=await User.findById(decodedToken.id);
                console.log(user)
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next();
    }
}
module.exports={ requireAuth, checkUser }