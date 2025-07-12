import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function (supabase) {
    const user = express.Router();

    user.get("/", (req, res) => {
        res.send("user to be implemented");
    });
    let username = "";
    
    user.post("/getStocks", async (req, res) => {
        let username = "";
        let { accesstoken } = req.body;

        jwt.verify(accesstoken, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json("User not valid");
            }

            try {
                const username = user.user;
            } catch (err) {
                console.log(err);
                return res.status(401).json("Invalid token structure");
            }
        });

        try {

            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .eq('username', username);
            console.log(username)
            return res.status(200).json(data);
        } catch (err) {
            return res.status(501).json(err);
        }

    });

    return user;
};    
