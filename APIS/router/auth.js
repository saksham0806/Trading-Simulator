import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";


// function authenticatToken(req,res,next){

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1]

//     if(!token){
//         return res.status(401).json("No access");
//     }

//     jwt.verify(token,JWT_SECRET_KEY,(err,user)=>{
//         if(err){
//             return res.status(401).json("No access");
//         }
//         req.user = user;
//         next();
//     })

// }

export default function (db) {
    const auth = express.Router();

    auth.get("/", (req, res) => {
        res.send("auth to be implemented");
    });

    auth.post("/login", async (req, res) => {
        const { username, password } = req.body;

        try {
            const attempt = await db.query(`SELECT username FROM users WHERE (username = $1 AND password = $2)`, [username, password])
            if (attempt.rows.length <= 0) {
                res.status(500).json("Invalid username or password")
            }
            else {

                const accessToken = jwt.sign(
                    {
                        user: username,
                        pass: password
                    },
                    JWT_SECRET_KEY
                    // ,{ expiresIn: "900s" }
                );
                const refreshToken = jwt.sign(
                    {
                        user: username,
                        pass: password
                    },
                    REFRESH_TOKEN_KEY
                );

                res.status(200).json(
                    {
                        "accesstoken": accessToken,
                        "refreshtoken": refreshToken
                    });
            }
        } catch (err) {
            console.log(err);
        }
    });
    auth.post("/register", async (req, res) => {
        const { username, password } = req.body;

        try {
            const attempt = await db.query(`SELECT username FROM users WHERE username = $1`, [username])
            if (attempt.rows.length > 0) {
                res.status(500).json("user already exits")
            }
            else {
                db.query(`INSERT INTO users (username,password) VALUES ($1,$2)`, [username, password], (err, result) => {
                    if (err) {
                        res.status(501).json(err);
                    }
                    else{
                        db.query(`INSERT INTO portfolio (username) VALUES ($1)`, [username], (err1, result1) => {
                            if (err1) {
                                res.status(502).json(err);
                            }else{
                                res.status(200).json("User created");
                            }
                        })
                    }

                })
            }
        } catch (err) {
            console.log(err);
        }
    });

    return auth;
};    
