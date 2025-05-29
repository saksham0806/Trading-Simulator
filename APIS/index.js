import express from "express";
import pricesAPI from "./router/prices.js";
import auth from "./router/auth.js";
import transaction from "./router/transaction.js";
import cors from "cors";
import {Pool} from "pg";

const app = express()
const port = 3000;

const db = new Pool({
  host:"localhost",
  user:"postgres",
  port:5432,
  password:"6A2A7171",
  database:"Users"
})

db.connect().then(()=>{
  console.log("connected to db")
}).catch((err)=>{
  console.log(err);
})

app.use(express.json());
app.use(cors());
app.use("/prices",pricesAPI);
app.use("/auth",auth(db));
app.use("/transaction",transaction(db));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})