import React from "react";
import "./Dashmain.css"
import { useDispatch, useSelector } from "react-redux";
import { data } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashmain() {

    const dispatch = useDispatch();
    // const { accessToken } = useSelector(state => state.auth);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZHNhIiwicGFzcyI6ImRzYSIsImlhdCI6MTc1MDI1NzYyMH0.TKOw_YiGUZ0tWId8uk7nt2UX4pDAEt2ccSL0qu_Z_kM";
    // if(accessToken==""){
    //     return (
    //         <div>User Not logged in</div>
    //     );
    // }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/user/getStocks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"accessToken":accessToken })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [accessToken]);
    console.log(userData);
    function countTrades(arr) {
        let cnt = 0;
        arr.forEach(element => {
            if (element != 0) {
                return cnt;
            }
        });
    }





    return (

        <div classNameName="dashmain">
            <section className="summary">
                <div className="container">
                    <h2>Welcome Back, Trader!</h2>
                    <div className="summary-cards">
                        <div className="card">
                            <h3>Account Balance</h3>
                            <p>$10,000.00</p>
                        </div>
                        <div className="card">
                            <h3>Total Profit</h3>
                            <p>$1,500.00</p>
                        </div>
                        <div className="card">
                            <h3>Open Trades</h3>
                            <p>5</p>
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
                                <th>Initial Price</th>
                                <th>Price</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="activity" className="activity">
                <div className="container">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>Bought 10 AAPL shares at $150.00</li>
                        <li>Sold 5 TSLA shares at $700.00</li>
                        <li>Bought 2 GOOGL shares at $2,800.00</li>
                    </ul>
                </div>
            </section>
        </div>

    );
}

export default Dashmain;