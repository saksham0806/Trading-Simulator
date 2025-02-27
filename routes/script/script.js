
// let apikey = "YPPADQPA2XTWLZXE";
let apikey = "S9THLB3PV4TUWGPA";
console.log("hello");
let symbols = ["IBM","NVDA","GOOG","TATAMOTORS","META","AMD","INTC","MSFT","AMZN","AAPL","TSLA"];


async function fetchPrice(symbol){
    let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
    // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
    let result = await api.json();
    return result["Time Series (5min)"];
}

async function addSymbol(symbol){

    let prices = await fetchPrice(symbol);
    let currprice = [];
    let times = [];
    for (const timestamp in prices) {
        if (prices.hasOwnProperty(timestamp)) {
            times.push(timestamp);
            currprice.push(parseFloat(prices[timestamp]["4. close"]));
        }
    }


    times.reverse();
    currprice.reverse();
    console.log(times)
    console.log(currprice);


    let div = document.createElement("div");
    div.innerHTML = `${currprice}
    `;
    document.querySelector(".pricesContainer").appendChild(div);

    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Stock Close Price',
                data: currprice,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'red'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Time' },
                    ticks: { autoSkip: true, maxTicksLimit: 5 }
                },
                y: {
                    title: { display: true, text: 'Close Price' }
                }
            }
        }
    });


}

addSymbol("AMD");
