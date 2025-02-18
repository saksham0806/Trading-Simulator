const express = require('express')
const path = require('path')
const fs = require("fs");
const app = express()

app.use(express.static(`${__dirname}/templates`));
const port = 3000

console.log(fs.readdirSync(`${__dirname}/templates/css`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/templates/home.html`);
})

app.get('/signinup', (req, res) => {
    res.sendFile(`${__dirname}/templates/signinup.html`);
})

app.get('/dashboard', (req, res) => {
    res.sendFile(`${__dirname}/templates/dashboard.html`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})