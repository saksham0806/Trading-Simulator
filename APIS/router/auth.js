import express from "express";

const auth = express.Router();

auth.get("/",(req,res)=>{
    res.send("auth to be implemented");
});



export default auth;