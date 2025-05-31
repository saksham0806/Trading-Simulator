import { useState } from "react";
import { useSelector } from "react-redux";
import "./Buysellmain.css"

function Buysellmain() {

    const {accesstoken} = useSelector(state => state.auth);

    const [formdata, setformdata] = useState(
        {
            // accesstoken:`${accesstoken}`,
            accesstoken:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZHNhIiwicGFzcyI6ImRzYSIsImlhdCI6MTc0ODY5ODI3M30.fmiuY9Pyc2kipltoizDrA8ywNUSU0m-0jnzTiEEziCg`,
            stockname: "",
            quantity: 0
        }
    )

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    async function handlesell(e) {
        e.preventDefault();
        try{
            let res = await fetch("http://localhost:3000/transaction/sell",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formdata)
                }
            )
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Success:", data);
        }catch(err){
            console.error("Error:", err);
        }

    }
    async function handlebuy(e) {
        e.preventDefault();
        try{
            let res = await fetch("http://localhost:3000/transaction/buy",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formdata)
                }
            )
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Success:", data);
        }catch(err){
            console.error("Error:", err);
        }

    }

    return (
        <div className="Buysellmain">
            <h1>Stock Trading Platform</h1>

            <div class="form-group">
                <label for="stockSelect">Select Stock:</label>
                <select id="stockSelect" name="stockname" onChange={handlechange}>
                    <option value="">-- Select a stock --</option>
                    <option value="IBM">IBM</option>
                    <option value="NVDA">NVIDIA (NVDA)</option>
                    <option value="GOOG">Google (GOOG)</option>
                    <option value="TATAMOTORS">NDAQ</option>
                    <option value="META">Meta (META)</option>
                    <option value="AMD">Advanced Micro Devices (AMD)</option>
                    <option value="INTC">Intel (INTC)</option>
                    <option value="MSFT">Microsoft (MSFT)</option>
                    <option value="AMZN">Amazon (AMZN)</option>
                    <option value="AAPL">Apple (AAPL)</option>
                    <option value="TSLA">Tesla (TSLA)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" min="1" value="1" name="quantity" onChange={handlechange}/>
            </div>

            <div class="button-group">
                <button id="buyBtn" onClick={handlebuy}>Buy</button>
                <button id="sellBtn" onClick={handlesell}>Sell</button>
            </div>

            <div id="resultMessage" class="result"></div>
        </div>
    )
}


export default Buysellmain;