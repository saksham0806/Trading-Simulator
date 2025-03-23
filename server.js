import express from "express";
import ejs from "ejs";
import path from "path";
import fs from "fs";
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
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/routes/home.html`);
})

app.get('/signinup', (req, res) => {
    res.sendFile(`${__dirname}/routes/signinup.html`);
})

app.get('/dashboard', (req, res) => {
    res.sendFile(`${__dirname}/routes/dashboard.html`);
})
app.get('/stock/:stockname', (req, res) => {
  res.render(`${__dirname}/views/stock.ejs`, {name:req.params.stockname});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})