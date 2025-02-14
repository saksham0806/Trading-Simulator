const express = require('express')
const app = express()
const port = 3000

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