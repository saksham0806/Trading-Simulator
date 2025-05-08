import React from "react";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "./Stockmain.css";

function Stockmain(props) {
    let symbol = props.stockName;
    // let apikey = "YPPADQPA2XTWLZXE";
    let apikey = "S9THLB3PV4TUWGPA";
    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];
    const [stockPrices, setstockPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        async function fetchPrice(symbol) {
            console.log("fetching Prices")
            let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
            // let api = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apikey}`);
            let result = await api.json();
            return result["Time Series (5min)"];
        }
        setLoading(true);
        fetchPrice(symbol).then(data => {
            console.log(data)
            setstockPrices(data);
            setLoading(false);
        })
    }, [symbol]);

    useEffect(() => {
        if (!loading && stockPrices && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            
            let prices = [];
            let times = [];
            for (const timestamp in stockPrices) {
                if (stockPrices.hasOwnProperty(timestamp)) {
                    times.push(timestamp);
                    prices.push(parseFloat(stockPrices[timestamp]["4. close"]));
                }
            }
            
            times.reverse();
            prices.reverse();
            
            let linecolor = prices[prices.length - 1] > prices[0] ? "rgb(129, 201, 149)" : "rgb(242, 139, 130)";
            
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
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
    }, [loading, stockPrices]);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

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
    
    let linecolor = "";
    if (prices[prices.length - 1] > prices[0]) {
        linecolor = "rgb(129, 201, 149)";
    }
    else {
        linecolor = "rgb(242, 139, 130)";
    }
    
    let changeInPriceToday = prices[prices.length - 1] - prices[0];
    let changepercentage = prices[prices.length - 1] / prices[0];
    if (changepercentage < 1) {
        changepercentage = (1 - changepercentage) * 100;
    } 
    else {
        changepercentage = (changepercentage - 1) * 100;
    }

    let prices1 = prices.slice(0, 12);
    let maxPrice24 = Math.max(...prices);
    let minPrice24 = Math.min(...prices);
    let maxprice1 = Math.max(...prices1);
    let minprice1 = Math.min(...prices1);

    maxPrice24 = Math.round(maxPrice24 * 100) / 100;
    minPrice24 = Math.round(minPrice24 * 100) / 100;
    maxprice1 = Math.round(maxprice1 * 100) / 100;
    minprice1 = Math.round(minprice1 * 100) / 100;

    return (
        <div className="Stockmain">
            <div className="main">
                <div className="pricesContainer">
                    <div className="stockname">
                        {symbol}
                    </div>
                    <div className="pricesnumbercontainer">
                        <div className="currentPrice">
                            {currPrice}
                        </div>
                        <div className="changeInPrices" style={{ color: linecolor }}>
                            {Math.round(changeInPriceToday * 100) / 100}({Math.round(changepercentage * 100) / 100}%)
                        </div>
                    </div>
                    <canvas id="stockChart" ref={chartRef} className="stockGraphCSS" width="1000" height="600"></canvas>
                    <div className="timeheader">From Last 24 hours</div>
                    <div className="minmax">Max Price - {maxPrice24}</div>
                    <div className="minmax">Min Price - {minPrice24}</div>
                    <div className="timeheader">From Last hours</div>
                    <div className="minmax">Max Price - {maxprice1}</div>
                    <div className="minmax">Min Price - {minprice1}</div>
                </div>
            </div>
        </div>
    );
}

export default Stockmain;