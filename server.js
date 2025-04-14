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
import { Console } from "console";
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

// Make sure these lines are in your server.js file and come BEFORE your route definitions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line if it's missing
app.use(express.static("public"));

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
  app.get('/buysell', (req, res) => {
    res.sendFile(`${__dirname}/routes/buysell.html`);
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

// Add this near your other routes in server.js
// Replace the existing transaction endpoint with this code
app.post('/api/transaction', async (req, res) => {
  const { stock, quantity, action } = req.body;
  // Since we're skipping authentication, we'll use a fixed user ID
  const userId = 1; // Using the first user in the database

  try {
    // Determine which column to use based on stock symbol
    let columnName;
    switch(stock) {
      case 'IBM': columnName = 'ibm'; break;
      case 'NVDA': columnName = 'nvda'; break;
      case 'GOOG': columnName = 'goog'; break;
      case 'TATAMOTORS': columnName = 'ndaq'; break;
      case 'META': columnName = 'meta'; break;
      case 'AMD': columnName = 'amd'; break;
      case 'INTC': columnName = 'intc'; break;
      case 'MSFT': columnName = 'msft'; break;
      case 'AMZN': columnName = 'amzn'; break;
      case 'AAPL': columnName = 'aapl'; break;
      case 'TSLA': columnName = 'tsla'; break;
      default: return res.status(400).json({ error: 'Invalid stock' });
    }

    if (action === 'buy') {
      // Buy stocks
      await db.query(
        `UPDATE users 
         SET ${columnName} = COALESCE(${columnName}, 0) + $1 
         WHERE id = $2`,
        [quantity, userId]
      );
      
      // Update total balance (assuming you want to track this)
      await db.query(
        `UPDATE users 
         SET total_balance = COALESCE(total_balance, 0) + $1 
         WHERE id = $2`,
        [quantity, userId]
      );
    } else if (action === 'sell') {
      // Check if user has enough shares
      const result = await db.query(
        `SELECT ${columnName} FROM users WHERE id = $1`,
        [userId]
      );

      const currentQuantity = result.rows[0][columnName] || 0;
      if (currentQuantity < quantity) {
        return res.status(400).json({ error: 'Insufficient shares to sell' });
      }

      // Sell stocks
      await db.query(
        `UPDATE users 
         SET ${columnName} = ${columnName} - $1 
         WHERE id = $2`,
        [quantity, userId]
      );
      
      // Update total balance
      await db.query(
        `UPDATE users 
         SET total_balance = COALESCE(total_balance, 0) - $1 
         WHERE id = $2`,
        [quantity, userId]
      );
    }

    res.json({ success: true, message: `Stock ${stock} ${action} successful` });
  } catch (err) {
    console.error('Transaction error:', err);
    res.status(500).json({ error: 'Transaction failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})