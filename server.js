import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(`${__dirname}/routes`));
app.use(express.static(`${__dirname}/routes/script/`));
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
app.get('/test', (req, res) => {
    res.sendFile(`${__dirname}/routes/test.html`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})