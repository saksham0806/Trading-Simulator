import React from "react";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "./Stockmain.css";

function Stockmain(props) {
    
    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];
    const [symbol, setsymbol] = useState(props.stockName);
    const [stockPrices, setstockPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        async function fetchPrice(symbol) {
            let api = await fetch(`http://localhost:3000/prices/${symbol}/`)
            let result = await api.json();
            return result;
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

            let prices = stockPrices["prices"];
            let times = stockPrices["times"];

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

    const handleStockChange = (e) => {
        let stk = e.target.value;
        setsymbol(stk);
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    let changepercentage = stockPrices["changepercentage"];
    let changeInPriceToday = stockPrices["changedifference"]
    let maxPrice24 = stockPrices["maxPrice24"];
    let minPrice24 = stockPrices["minPrice24"];
    let maxprice1 = stockPrices["maxprice1"];
    let minprice1 = stockPrices["minprice1"];
    let currPrice = stockPrices["currPrice"]


    let prices = stockPrices["prices"];
    let times = stockPrices["times"];

    let linecolor = "";
    if (prices[prices.length - 1] > prices[0]) {
        linecolor = "rgb(129, 201, 149)";
    }
    else {
        linecolor = "rgb(242, 139, 130)";
    }

    if (changepercentage < 1) {
        changepercentage = (1 - changepercentage) * 100;
    }
    else {
        changepercentage = (changepercentage - 1) * 100;
    }

    return (
        <div className="Stockmain">
            <div className="main">
                <div className="pricesContainer">
                    <select
                        name="stockname"
                        className="stockname"
                        id="stockname"
                        value={symbol}
                        onChange={handleStockChange}
                    >
                        {symbols.map((stockSymbol) => (
                            <option key={stockSymbol} value={stockSymbol}>
                                {stockSymbol}
                            </option>
                        ))}
                    </select>
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