
// let apikey = "YPPADQPA2XTWLZXE";
let apikey = "S9THLB3PV4TUWGPA";
console.log("Script Running");
let symbols = ["IBM", "NVDA", "GOOG", "TATAMOTORS", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];
// var accesspoint = <%= gameState %>;
console.log(stock_name);
async function fetchPrice(symbol) {
    console.log("fetching Prices")
    let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
    // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
    let result = await api.json();
    return result["Time Series (5min)"];
}

async function addSymbol(symbol) {
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
    console.log(currPrice);
    
    if(prices[prices.length-1]>prices[0]){
        linecolor = "rgb(129, 201, 149)";
    }
    else{
        linecolor = "rgb(242, 139, 130)";
    }
    
    let symbolName = document.createElement("div");
    symbolName.innerHTML = symbol;
    symbolName.style.fontSize = '30px';
    
    let div = document.createElement("div");
    div.className = "pricesnumbercontainer";
    let current = document.createElement("div");
    current.className = "currentPrice"
    current.innerHTML = `${currPrice}
    `;
    let change = document.createElement("div");
    change.className = "changeInPrices";
    let changepercentage = prices[prices.length-1]/prices[0];
    if(changepercentage<1){
        changepercentage = (1-changepercentage)*100;
        change.style.color = "rgb(242, 139, 130)";
    }
    else{
        changepercentage = (changepercentage-1)*100;
        change.style.color = "rgb(129, 201, 149)";
    }
    changepercentage = Math.round(changepercentage*100)/100;
    changedifference = Math.round(Math.abs(prices[prices.length-1]-prices[0])*100)/100;
    change.innerHTML = changedifference+" ("+changepercentage+"%)";
    div.append(current);
    div.append(change);
    
    document.querySelector(".pricesContainer").prepend(div);
    document.querySelector(".pricesContainer").prepend(symbolName);
    
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

addSymbol(stock_name);
