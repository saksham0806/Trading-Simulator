import express from "express";

let apikey = "S9THLB3PV4TUWGPA";
async function fetchPrice(symbol) {
  console.log("fetching Prices")
  let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
  // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
  let result = await api.json();
  return result["Time Series (5min)"];
}


export default function (db) {

  const prices = express.Router();

  const date = new Date();

  prices.get('/', (req, res) => {
    res.status(200).json("working");
  });

  prices.get("/getAll", async (req, res) => {

    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];
    let pricejsons = [];
    async function addToArray() {
      for (let e of symbols) {
        let temp = await fetchPrice(e);
        let prices = [];
        let times = [];
        for (const timestamp in temp) {
          if (temp.hasOwnProperty(timestamp)) {
            times.push(timestamp);
            prices.push(parseFloat(temp[timestamp]["4. close"]));
          }
        }
        pricejsons.push({ prices, times })
      }
    }
    await addToArray();

    try {
      await db.query(`INSERT INTO stockprices ("Time") VALUES ($1)`, [date]);

      for (let i = 0; i < pricejsons.length; i++) {
        await db.query(
          `UPDATE stockprices SET "${symbols[i]}" = $1 WHERE "Time" = $2`,
          [pricejsons[i], date]
        );
        console.log(`Updated ${symbols[i]}`);
      }

      return res.status(200).json("prices updated");
    } catch (err) {
      return res.status(501).json(err);
    }



    res.status(200).json(pricejsons);
  });


  prices.get('/:symbol', async (req, res) => {
    let symbol = req.params.symbol;

    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];


    async function sendPrices(symbol) {
      let linecolor = "";

      let stockPrices = await fetchPrice(symbol);
      let prices = [];
      let times = [];
      for (const timestamp in stockPrices) {
        if (stockPrices.hasOwnProperty(timestamp)) {
          times.push(timestamp);
          prices.push(parseFloat(stockPrices[timestamp]["4. close"]));
        }
      }
      let currPrice = prices[0];

      times.reverse();
      prices.reverse();
      // console.log(currPrice);

      let prices1 = prices.slice(0, 12); // Fixed: added 'let'
      let maxPrice24 = prices[0];
      let minPrice24 = prices[0];

      prices.forEach(i => {
        if (i > maxPrice24) {
          maxPrice24 = i;
        }
        if (i < minPrice24) {
          minPrice24 = i;
        }
      });
      maxPrice24 = Math.round(maxPrice24 * 100) / 100;
      minPrice24 = Math.round(minPrice24 * 100) / 100;

      let maxprice1 = prices[0];
      let minprice1 = prices[0];

      prices1.forEach(i => {
        if (i > maxprice1) {
          maxprice1 = i;
        }
        if (i < minprice1) {
          minprice1 = i;
        }
      });
      maxprice1 = Math.round(maxprice1 * 100) / 100;
      minprice1 = Math.round(minprice1 * 100) / 100;

      let maxprices1 = prices1[0];
      let minprices1 = prices1[0];
      prices1.forEach(i => {
        if (i > maxprice1) {
          maxprice1 = i;
        }
        if (i < minprice1) {
          minprice1 = i;
        }
      });

      let changepercentage = prices[prices.length - 1] / prices[0];
      changepercentage = Math.round(changepercentage * 100) / 100;
      let changedifference = Math.round(Math.abs(prices[prices.length - 1] - prices[0]) * 100) / 100; // Fixed: added 'let'

      return {
        symbol,
        currPrice,
        maxPrice24,
        minPrice24,
        maxprice1,
        minprice1,
        changepercentage,
        changedifference,
        prices,
        times
      };
    }

    try {
      const priceData = await sendPrices(symbol);
      res.status(200).json(priceData);
    } catch (error) {
      console.error("Error fetching price data:", error);
      res.status(500).json({ error: "Failed to fetch price data" });
    }
  });

  return prices;

};
