import React from "react";
import "./Dashmain.css"
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashmain() {
    let Navigate = useNavigate();
    let symbols = ["IBM", "NVDA", "GOOG", "NDAQ", "META", "AMD", "INTC", "MSFT", "AMZN", "AAPL", "TSLA"];

    const dispatch = useDispatch();
    const accessToken  = useSelector(state => state.auth.accesstoken);
    // console.log(accessToken);
    // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXNkIiwiaWF0IjoxNzUyNzI0NTMwfQ.xpVKCT5SCReT15ooYkrjbgCuMK4c09payshkckOJsNw";
    const [userData, setUserData] = useState(null);
    const [userBalance, setUserBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tradeCount, settradeCount] = useState(0);
    const [error, setError] = useState(null);
    const [stockPrices, setStockPrices] = useState(null);
    const [stockValue, setStockvalue] = useState(0);
    const [tableData, settableData] = useState([]);

    if(accessToken==""){
        return (
            <div>User Not logged in</div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/user/getStocks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "accesstoken": accessToken })
                });
                const response2 = await fetch("http://localhost:3000/prices/getAllPrices");

                if (!response.ok || !response2.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const data2 = await response2.json();
                setUserData(data);
                setStockPrices(data2);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accessToken]);


    function processTable(symbols, stockPrices, userData) {
        let count = 0;
        let stockvalue = 0;
        for (let i = 0; i < stockPrices.length; i++) {
            const stock = stockPrices[i].stock;
            const price = stockPrices[i].price;
            const quantity = userData[stock.toLowerCase()];
            // console.log({stock,price,quantity})
            stockvalue += price * quantity;
            if (quantity != 0) {
                count++;
                setStockvalue(stockValue + (price * quantity))
                settableData(prevData => [...prevData, {
                    stock: stock,
                    price: price,
                    quantity: quantity
                }]);
            }
        }
        settradeCount(count);
        setStockvalue(stockvalue);
    }
    useEffect(() => {
        if (stockPrices) {
            processTable(symbols, stockPrices, userData);
            setUserBalance(userData["balance"]);
        }
    }, [stockPrices, userData]);

    function handleStockClick(a){
        Navigate(`/stock/${a}`)
    }



    return (

        <div className="dashmain">
            <section className="summary">
                <div className="container">
                    <h2>Welcome Back, Trader!</h2>
                    <div className="summary-cards">
                        <div className="card">
                            <h3>Account Balance</h3>
                            <p>${userBalance}</p>
                        </div>
                        <div className="card">
                            <h3>Total Stock Value</h3>
                            <p>${Math.round(stockValue * 100) / 100}</p>
                        </div>
                        <div className="card">
                            <h3>Total Holdings</h3>
                            <p>{tradeCount}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="portfolio" className="portfolio">
                <div className="container">
                    <h2>Portfolio Overview</h2>
                    <table className="stocksInInventory">
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Quantity</th>
                                {/* <th>Initial Price</th> */}
                                <th>Price</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tableData.map((item,index) => (
                                    <tr key={index} onClick={()=>{handleStockClick(item.stock)}}>
                                        <td>{item.stock}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{Math.round(item.price * item.quantity * 100) / 100}</td>
                                    </tr>
                                ))

                            }

                            {/* <tr>
                                <td>IBM</td>
                                <td>10</td>
                                <td>$150.00</td>
                                <td>$150.00</td>
                                <td>$1,500.00</td>
                            </tr>
                            <tr>
                                <td>TSLA</td>
                                <td>5</td>
                                <td>$700.00</td>
                                <td>$700.00</td>
                                <td>$3,500.00</td>
                            </tr>
                            <tr>
                                <td>GOOGL</td>
                                <td>2</td>
                                <td>$2,800.00</td>
                                <td>$2,800.00</td>
                                <td>$5,600.00</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* <section id="activity" className="activity">
                <div className="container">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>Bought 10 AAPL shares at $150.00</li>
                        <li>Sold 5 TSLA shares at $700.00</li>
                        <li>Bought 2 GOOGL shares at $2,800.00</li>
                    </ul>
                </div>
            </section> */}
        </div>

    );
}

export default Dashmain;