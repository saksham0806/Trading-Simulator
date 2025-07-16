import { isArray } from "chart.js/helpers";
import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function (supabase) {
    const transaction = express.Router();

    transaction.post("/buy", async (req, res) => {
        1
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
            console.log(username);

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

            let { data: history, error2 } = await supabase
                .from('history')
                .select('transaction')
                .eq('username', username);

            if (error2) throw error2;
            if (!history || history.length === 0) {
                const initialTransaction = [{ stockname, quantity, action: "buy" }];
                const { data3, error3 } = await supabase
                    .from("history")
                    .insert({
                        username: username,
                        transaction: initialTransaction
                    });
                if (error3) throw error3;
                return;
            }

            let existingTransactions = history[0].transaction;

            if (typeof existingTransactions === 'string') {
                try {
                    existingTransactions = JSON.parse(existingTransactions);
                } catch (e) {
                    existingTransactions = [];
                }
            }
            if (!Array.isArray(existingTransactions)) {
                existingTransactions = existingTransactions ? [existingTransactions] : [];
            }

            existingTransactions.push({ stockname, quantity, action: "buy" });

            const { data4, error4 } = await supabase
                .from("history")
                .update({
                    transaction: existingTransactions  // Send as array, Supabase will handle serialization
                })
                .eq("username", username);

            if (error4) throw error4;

            if (error) {
                res.status(404).json(error)
            } else {
                res.status(200).json("successfully bought stocks")
            }
        }

    });



    transaction.post("/sell", async (req, res) => {
        let { accesstoken, stockname, quantity } = req.body;
        const api = await fetch(`http://localhost:3000/prices/${stockname}/`)
        const result = await api.json();
        const currentprice = result["currPrice"]
        let balance = 0;
        let currentStockAmt = 0;
        let username = ""
        stockname = stockname.toLowerCase();
        console.log(`Proccessing sell for ${stockname}`);

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

        let capitalGain = quantity * currentprice;
        if (currentStockAmt < quantity) {
            res.send("insufficient stocks to sell");
        } else {
            const { data, error } = await supabase
                .from('portfolio')
                .update({
                    [stockname.toLowerCase()]: currentStockAmt - quantity,
                    balance: Number(balance) + Number(capitalGain)
                })
                .eq('username', username);

                let { data: history, error2 } = await supabase
                .from('history')
                .select('transaction')
                .eq('username', username);

            if (error2) throw error2;
            if (!history || history.length === 0) {
                const initialTransaction = [{ stockname, quantity, action: "buy" }];
                const { data3, error3 } = await supabase
                    .from("history")
                    .insert({
                        username: username,
                        transaction: initialTransaction
                    });
                if (error3) throw error3;
                return;
            }

            let existingTransactions = history[0].transaction;

            if (typeof existingTransactions === 'string') {
                try {
                    existingTransactions = JSON.parse(existingTransactions);
                } catch (e) {
                    existingTransactions = [];
                }
            }
            if (!Array.isArray(existingTransactions)) {
                existingTransactions = existingTransactions ? [existingTransactions] : [];
            }

            existingTransactions.push({ stockname, quantity, action: "sell" });

            const { data4, error4 } = await supabase
                .from("history")
                .update({
                    transaction: existingTransactions  // Send as array, Supabase will handle serialization
                })
                .eq("username", username);

            if (error4) throw error4;

            if (error) {
                res.status(404).json(err)
            } else {
                res.status(200).json("successfully sold stocks")
            }
        }

    });

    return transaction;
};


