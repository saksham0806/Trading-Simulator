import express from "express";

export default function(db){
    const transaction = express.Router();
    
    transaction.get("/",(req,res)=>{
        res.send("Transaction to be implemented");
    });

    return transaction;
};


