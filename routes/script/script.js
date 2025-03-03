
// let apikey = "YPPADQPA2XTWLZXE";
let apikey = "S9THLB3PV4TUWGPA";
console.log("Script Running");
let symbols = ["IBM", "NVDA", "GOOG", "TATAMOTORS", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];


async function fetchPrice(symbol) {
    console.log("fetching Prices")
    let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
    // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
    let result = await api.json();
    return result["Time Series (5min)"];
}

async function addSymbol(symbol) {

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
    console.log(currPrice);


    let div = document.createElement("div");
    div.innerHTML = `${currPrice}
    `;
    document.querySelector(".pricesContainer").appendChild(div);

    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                data: prices,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
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

addSymbol("IBM")
