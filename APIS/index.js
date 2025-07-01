import express from "express";
import pricesAPI from "./router/prices.js";
import auth from "./router/auth.js";
import transaction from "./router/transaction.js";
import user from "./router/user.js"
import cors from "cors";
import {Pool} from "pg";


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jlfwhuigtawtclnogmrq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZndodWlndGF3dGNsbm9nbXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzMxNzAsImV4cCI6MjA2NjE0OTE3MH0.psyd2RPJ0g1VRaKlJQ0Wpfba-j58iuQFXpW2IczvgCs"
const supabase = createClient(supabaseUrl, supabaseKey)

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
app.use("/prices",pricesAPI(db));
app.use("/auth",auth(supabase));
app.use("/transaction",transaction(db));
app.use("/user",user(supabase));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`port ${port}`)
})