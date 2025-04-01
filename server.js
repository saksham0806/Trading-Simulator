import express from "express";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "6A2A7171",
  port: 5432,
});
db.connect();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/routes`));
app.use(express.static(`${__dirname}/routes/script/`));
app.use(express.static(`${__dirname}/views`));
app.use(express.static(`${__dirname}/views/css`));
app.use(express.static(`${__dirname}/views/script/`));
const port = 3000;
// // const db = new pg.Client({
// //   user: "postgres",
// //   host: "localhost",
// //   database: "secrets",
// //   password: "Pota4567#",
// //   port: 5432,
// // });
// db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/routes/home.html`);
})

app.get('/signinup', (req, res) => {
    res.sendFile(`${__dirname}/routes/signinup.html`);
  })
  app.get('/register', (req, res) => {
    res.sendFile(`${__dirname}/routes/register.html`);
  })
  
  app.get('/dashboard', (req, res) => {
    res.sendFile(`${__dirname}/routes/dashboard.html`);
  })
  app.get('/stock/:stockname', (req, res) => {
    res.render(`${__dirname}/views/stock.ejs`, {name:req.params.stockname});
  })
  
  
  app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      
      if (checkResult.rows.length > 0) {
        return res.redirect('/signinup?error=already_registered');
      } else {
        const result = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2)",
          [email, password]
        );
        console.log(result);
        return res.redirect('/signinup?error=success');
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/signinup", async (req, res) => {
  const email = req.body.username.trim().toLowerCase(); // Normalize email
  const password = req.body.password.trim(); // Trim password

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (result.rows.length === 0) {
      // User not found - redirect to register page with error
      return res.redirect('/register?error=user_not_found');
    }

    const user = result.rows[0];
    const storedPassword = user.password;
    
    if (password === storedPassword) {
      // Successful login
      return res.redirect('/dashboard');
    } else {
      // Wrong password - redirect back to login with error
      return res.redirect('/signinup?error=wrong_password');
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.redirect('/signinup?error=server_error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})