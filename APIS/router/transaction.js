import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function(db){
    const transaction = express.Router();
    
    transaction.get("/",(req,res)=>{
        jwt.verify(req.body["accesstoken"],JWT_SECRET_KEY,(err,user)=>{
            if(err){
                res.send("invalid token")
            }
            console.log(user);
            res.send(user);
        })
    });

    return transaction;
};


