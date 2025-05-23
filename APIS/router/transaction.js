import express from "express";

const transaction = express.Router();

transaction.get("/",(req,res)=>{
    res.send("Transaction to be implemented");
});



export default transaction;