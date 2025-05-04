import React from "react";
import "./Stockmain.css";

function Stockmain(props) {

    let symbol = props.stockName;
    console.log(symbol);

    // let apikey = "YPPADQPA2XTWLZXE";
    let apikey = "S9THLB3PV4TUWGPA";
    console.log("Script Running");
    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];
    async function fetchPrice(symbol) {
        console.log("fetching Prices")
        let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
        // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
        let result = await api.json();
        return result["Time Series (5min)"];
    }
    async function add(symbol) {

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
        if (prices[prices.length - 1] > prices[0]) {
            linecolor = "rgb(129, 201, 149)";
        }
        else {
            linecolor = "rgb(242, 139, 130)";
        }


        prices1 = prices.slice(0, 12);
        let maxPrice24 = prices[0];
        let minPrice24 = prices[0];
        let maxprice1 = prices[0];
        let minprice1 = prices[0];

        prices.forEach(i => {
            if (i > maxPrice24) {
                maxPrice24 = i;
            }
            if (i < minPrice24) {
                minPrice24 = i;
            }
        });
        prices1.forEach(i => {
            if (i > maxprice1) {
                maxprice1 = i;
            }
            if (i < minprice1) {
                minprice1 = i;
            }
        });

        maxPrice24 = Math.round(maxPrice24 * 100) / 100;
        minPrice24 = Math.round(minPrice24 * 100) / 100;
        maxprice1 = Math.round(maxprice1 * 100) / 100;
        minprice1 = Math.round(minprice1 * 100) / 100;



    }




    return (
        <div className="Stockmain">
            <div class="main">
                <div class="pricesContainer">
                    <canvas id="stockChart" class="stockGraphCSS"></canvas>
                </div>
            </div>
        </div>
    );
}

export default Stockmain;







async function addSymbol(symbol) {

    console.log(currPrice);





    let symbolName = document.createElement("div");
    symbolName.innerHTML = symbol;
    symbolName.style.fontSize = '60px';

    let div = document.createElement("div");
    div.className = "pricesnumbercontainer";
    let current = document.createElement("div");
    current.className = "currentPrice"
    current.innerHTML = `${currPrice}
    `;
    let change = document.createElement("div");
    change.className = "changeInPrices";
    let changepercentage = prices[prices.length - 1] / prices[0];
    if (changepercentage < 1) {
        changepercentage = (1 - changepercentage) * 100;
        change.style.color = "rgb(242, 139, 130)";
    }
    else {
        changepercentage = (changepercentage - 1) * 100;
        change.style.color = "rgb(129, 201, 149)";
    }
    changepercentage = Math.round(changepercentage * 100) / 100;
    changedifference = Math.round(Math.abs(prices[prices.length - 1] - prices[0]) * 100) / 100;
    change.innerHTML = changedifference + " (" + changepercentage + "%)";
    div.append(current);
    div.append(change);
    let maxdiv = document.createElement("div");
    let mindiv = document.createElement("div");
    let timeheader = document.createElement("div");
    timeheader.className = "timeheader";
    timeheader.innerHTML = "from last 24 hours";
    maxdiv.className = "minmax maxdiv";
    mindiv.className = "minmax mindiv";
    maxdiv.innerHTML = `Max Price - ${maxPrice24}`;
    mindiv.innerHTML = `Min Price - ${minPrice24}`;

    let maxdiv1 = document.createElement("div");
    let mindiv1 = document.createElement("div");
    let timeheader1 = document.createElement("div");
    timeheader1.className = "timeheader";
    timeheader1.innerHTML = "from last 1 hours"
    maxdiv1.className = "minmax maxdiv";
    mindiv1.className = "minmax mindiv";
    maxdiv1.innerHTML = `Max Price - ${maxprice1}`;
    mindiv1.innerHTML = `Min Price - ${minprice1}`;


    document.querySelector(".pricesContainer").prepend(div);
    document.querySelector(".pricesContainer").prepend(symbolName);
    document.querySelector(".pricesContainer").append(timeheader);
    document.querySelector(".pricesContainer").append(maxdiv);
    document.querySelector(".pricesContainer").append(mindiv);
    document.querySelector(".pricesContainer").append(timeheader1);
    document.querySelector(".pricesContainer").append(maxdiv1);
    document.querySelector(".pricesContainer").append(mindiv1);



    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                data: prices,
                borderColor: linecolor,
                backgroundColor: linecolor,
                borderWidth: 2,
                pointRadius: 0,
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: true,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                        autoSkip: true,
                        maxTicksLimit: 5,
                    },
                    title: {
                        display: false,
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                        stepSize: 50,
                    },
                    title: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });

}
