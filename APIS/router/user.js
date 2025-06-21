import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function (db) {
    const user = express.Router();

    user.get("/", (req, res) => {
        res.send("user to be implemented");
    });
    let username = ""

    user.post("/getStocks",async (req, res) => {
        let { accessToken } = req.body;

        jwt.verify(accessToken, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json("User not valid")
            }try{
                username = user.user
            }catch(err){
                console.log(err);
            }

        })

        try {
            const attempt = await db.query(`SELECT * FROM portfolio WHERE username = $1`,[username])
            res.status(200).json(attempt.rows[0]);
        }catch (err){
            res.status(501).json(err);
        }

    });

    return user;
};    
