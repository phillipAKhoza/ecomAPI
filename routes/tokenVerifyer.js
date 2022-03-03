const jwt = require("jsonwebtoken");

const tokenVerification = (req, res, next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user)=>{
            if(error) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("Your are not Authenticated!");
    }
};

const tokenVerificationAndAuth = (req, res, next)=>{
    tokenVerification(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Your are not authorised to perform your request!");
        }
    });
};

const tokenVerificationAndAdmin = (req, res, next)=>{
    tokenVerification(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Your are not authorised to perform your request!");
        }
    });
};

module.exports = {tokenVerification, tokenVerificationAndAuth, tokenVerificationAndAdmin};