import React from "react";
import './Homemain.css'

function Homemain() {
    return (
        <div className="HomeMainBody">

            <section class="mainline">
                <div class="container">
                    <h2>Trade Smarter, Not Harder</h2>
                    <p>Join our demo trading platform to practice trading with virtual funds and real-time market data.</p>
                    <a href="signinup.html" class="btn">Get Started</a>
                </div>
            </section>
            <section id="features" className="features">
                <div className="container">
                    <h2>Features</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <h3>Real-Time Data</h3>
                            <p>Access real-time market data to make informed trading decisions.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Virtual Funds</h3>
                            <p>Practice trading with virtual funds without any financial risk.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Advanced Tools</h3>
                            <p>Use advanced charting tools and indicators to analyze the market.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default Homemain;