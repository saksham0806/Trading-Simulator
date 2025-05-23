import express from "express";
import pricesAPI from "./router/prices.js";
import auth from "./router/auth.js";
import transaction from "./router/transaction.js";
import cors from "cors";
const app = express()
const port = 3000;

app.use(cors());
app.use("/prices",pricesAPI);
app.use("/auth",auth);
app.use("/transaction",transaction);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})