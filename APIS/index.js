import express from "express";
import pricesAPI from "./router/prices.js";
const app = express()
const port = 3000;

app.use("/prices",pricesAPI);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})