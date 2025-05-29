import express from "express";

export default function(db){
    const auth = express.Router();
    
    auth.get("/",(req,res)=>{
        res.send("auth to be implemented");
    });
    
    auth.post("/login",async (req,res)=>{
        const {username,password} = req.body;

        try{
            const attempt = await db.query(`SELECT username FROM users WHERE (username = $1 AND password = $2)`,[username,password])
            if(attempt.rows.length<=0){
                res.status(500).json("Invalid username or password")
            }
            else{
                res.status(200).json("login success");
            }
        }catch(err){
            console.log(err);
        }
    });
    auth.post("/register",async (req,res)=>{
        const {username,password} = req.body;

        try{
            const attempt = await db.query(`SELECT username FROM users WHERE username = $1`,[username])
            if(attempt.rows.length>0){
                res.status(500).json("user already exits")
            }
            else{
                db.query(`INSERT INTO users (username,password) VALUES ($1,$2)`,[username,password],(err,result)=>{
                    if(err){
                        res.status(500),json(err);
                    }else{
                        res.status(200).json("User created");
                    }
                })
            }
        }catch(err){
            console.log(err);
        }
    });
    
    return auth;
};    
