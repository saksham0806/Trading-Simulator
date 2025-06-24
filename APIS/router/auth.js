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

export default function (supabase) {
    const auth = express.Router();

    auth.get("/", (req, res) => {
        res.send("auth to be implemented");
    });

    auth.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Username and password are required");
    }

    try {
        const { data, error } = await supabase
            .from('userdetails')
            .select('*')
            .eq('username', username)
            .eq('password', password);
        console.log(data)
        if (error || data.length<1) {
            return res.status(401).json("Invalid username or password");
        }

        const accessToken = jwt.sign(
            { user: username },
            JWT_SECRET_KEY
            // { expiresIn: "900s" } // optional expiration
        );
        
        const refreshToken = jwt.sign(
            { user: username },
            REFRESH_TOKEN_KEY
        );

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json("Internal server error");
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
