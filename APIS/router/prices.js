import express from "express";
let polygon_api_key = "	zzH6soyGbzA0COmbNxpJpC9xt8RlfrJR";
let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];

// let key = "d1bb3a1r01qsbpububo0d1bb3a1r01qsbpububog";
// let alpaca = "PKN0V6BWX95M9TCR9ZGL"
// let apikey = "S9THLB3PV4TUWGPA";

function formattedDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
function formattedTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

let today = formattedDate(Date.now() - 1 * (60 * 60 * 24 * 1000));
let yesterday = formattedDate(Date.now() - 2 * (60 * 60 * 24 * 1000));

console.log()


async function fetchPrice(symbol) {
    console.log("fetching Prices")
    let api = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${yesterday}/${today}?adjusted=true&sort=asc&limit=50000&apiKey=${polygon_api_key}`)
    // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
    // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
    let result = await api.json();
    return result["results"];
}


async function sendPrices(symbol) {
    let linecolor = "";

    let stockPrices = await fetchPrice(symbol);
    let prices = [];
    let times = [];

    for (let i = 0; i < stockPrices.length; i++) {
        prices.push(stockPrices[i]['c']);
        times.push(formattedTime(stockPrices[i]['t']));
    }
    let currPrice = prices[0];

    times.reverse();
    prices.reverse();
    console.log(currPrice);

    let prices1 = prices.slice(0, 12);
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





export default function (supabase, db) {

    const prices = express.Router();

    const date = new Date();

    prices.get('/', async (req, res) => {
        res.status(200).json(await fetchPrice("IBM"));
    });

    prices.get("/setAll", async (req, res) => {
        
        let pricejsons = [];
        async function addToArray() {
            for (let e of symbols) {
                let temp = await sendPrices(e);
                pricejsons.push(temp)
                await new Promise(resolve => setTimeout(resolve, 15000));
            }
        }
        await addToArray();

        try {



            // const { data, error } = await supabase
            //     .from('stockprices')
            //     .insert([
            //         {
            //             Time: date
            //         }
            //     ]);

            // if (error) {
            //     res.status(500).json("error updating time in db");
            //     throw error;
            // }

            for (let i = 0; i < pricejsons.length; i++) {

                
                const { data, error } = await supabase
                    .from('stockprices')
                    .update({
                        [symbols[i].toLowerCase()]: pricejsons[i]
                    })
                    .eq('id', 1)
                    if(error){
                        console.log(error)
                    }
                console.log(`Updated ${symbols[i]}`);
            }

            return res.status(200).json("prices updated");
        } catch (err) {
            return res.status(501).json(err);
        }

    });

    prices.get("/getAll", async (req, res) => {
        try {
            const {data,err} = await supabase.from("stockprices")
            .select("*");
            return res.status(200).json(data);
        } catch (err) {
            res.status(501).json(err);
        }
    })

    prices.get("/getAllPrices", async (req, res) => {
        try {
            let result = [];
            const {data,err} = await supabase.from("stockprices")
            .select("*");
            for (let i = 0; i < symbols.length; i++) {
                let temp = data[0][symbols[i].toLowerCase()]["currPrice"];
                result.push({ stock: symbols[i], price: temp });
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(501).json(err);
        }
    })



    prices.get('/:symbol', async (req, res) => {
        let symbol = req.params.symbol;

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
