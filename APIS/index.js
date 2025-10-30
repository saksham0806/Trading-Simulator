import express from "express";
import pricesAPI from "./router/prices.js";
import auth from "./router/auth.js";
import transaction from "./router/transaction.js";
import user from "./router/user.js"
import cors from "cors";
import {Pool} from "pg";
import 'dotenv/config';


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASEURL
const supabaseKey = process.env.SUPABASEKEY
const supabase = createClient(supabaseUrl, supabaseKey)
const supabasepass = process.env.SUPABASEPASS 
const app = express()
const port = 3000;

const db = new Pool({
  host:"localhost",
  user:"postgres",
  port:5432,
  password: supabasepass,
  database:"Users"
})

db.connect().then(()=>{
  console.log("connected to db")
}).catch((err)=>{
  console.log(err);
})

app.use(express.json());
app.use(cors());
app.use("/prices",pricesAPI(supabase,db));
app.use("/auth",auth(supabase));
app.use("/transaction",transaction(supabase));
app.use("/user",user(supabase));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`port ${port}`)
})