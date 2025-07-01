import express from "express";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function (supabase) {
    const transaction = express.Router();

    transaction.post("/buy", async (req, res) => {
        let { accesstoken, stockname, quantity } = req.body;
        const api = await fetch(`http://localhost:3000/prices/${stockname}/`)
        const result = await api.json();
        const currentprice = result["currPrice"]
        let balance = 0;
        let currentStockAmt = 0;
        let username = ""
        stockname = stockname.toLowerCase();
        console.log(`Proccessing buy for ${stockname}`);

        jwt.verify(accesstoken, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json("User not valid")
            }
            username = user.user

        })

        const fetchdb = async () => {
            const { data, error } = await supabase.from("portfolio")
                .select(`${stockname},balance`)
                .eq('username', username);

            if (error) {
                res.status(404).json("user not valid or stockname not valid")
            }
            else {
                balance = data[0]["balance"];
                currentStockAmt = data[0][stockname];
            }
        }
        await fetchdb();

        let costToUser = currentprice * quantity;
        console.log(costToUser)
        if (Number(costToUser) > Number(balance)) {
            res.send("insufficient balance");
        } else {

            const { data, error } = await supabase
                .from('portfolio')
                .update({
                    [stockname.toLowerCase()]: currentStockAmt + quantity,
                    balance: Number(balance) - Number(costToUser)
                })
                .eq('username', username);

                if (error) {
                    res.status(404).json(err)
                } else {
                    res.status(200).json("successfully bought stocks")
                }
        }

    });



    transaction.post("/sell", async (req, res) => {
        const { accesstoken, stockname, quantity } = req.body;
        const api = await fetch(`http://localhost:3000/prices/${stockname}/`)
        const result = await api.json();
        const currentprice = result["currPrice"]
        let balance = 0;
        let currentStockAmt = 0;
        let username = ""

        jwt.verify(accesstoken, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json("User not valid")
            }
            username = user.user

        })

        const fetchdb = async () => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT "${stockname}",balance FROM portfolio WHERE username = $1`, [username], (err, result) => {
                    if (err) {
                        res.status(404).json("user not valid or stockname not valid")
                        reject(err);
                    }
                    else {
                        balance = result.rows[0]["balance"];
                        currentStockAmt = result.rows[0][`${stockname}`];
                        resolve();
                    }
                })
            })
        }
        await fetchdb();

        let capitalGain = quantity * currentprice;
        if (currentStockAmt < quantity) {
            res.send("insufficient stocks to sell");
        } else {
            db.query(`UPDATE portfolio 
                SET "${stockname}" = $1,
                balance = $2
                WHERE username = $3
                `, [(currentStockAmt - quantity), (balance + capitalGain), (username)], (err, result) => {
                if (err) {
                    res.status(404).json("user not valid or stockname not valid")
                } else {
                    res.status(200).json("successfull sold stocks")
                }
            })
        }

    });

    return transaction;
};


