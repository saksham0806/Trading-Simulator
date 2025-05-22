import express from "express";

const auth = express.Router();

auth.get("/login",(resizeBy,req)=>{
    resizeBy.send("login");
});



export default auth;