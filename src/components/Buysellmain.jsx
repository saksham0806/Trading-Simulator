import { useState } from "react";
import "./Buysellmain.css"

function Buysellmain(){

    const [formdata,setformdata] = useState(
        {
            stock:"",
            quant:0
        }
    )

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    function handlesell(){
        //to implement
    }

    return (
        <div className="Buysellmain">
            <h1>Stock Trading Platform</h1>

        <div class="form-group">
            <label for="stockSelect">Select Stock:</label>
            <select id="stockSelect" name="stock" onChange={handlechange}>
                <option value="">-- Select a stock --</option>
                <option value="IBM">IBM</option>
                <option value="NVDA">NVIDIA (NVDA)</option>
                <option value="GOOG">Alphabet (GOOG)</option>
                <option value="TATAMOTORS">Tata Motors (TATAMOTORS)</option>
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
            <input type="number" id="quantity" min="1" value="1"/>
        </div>

        <div class="button-group">
            <button id="buyBtn">Buy</button>
            <button id="sellBtn">Sell</button>
        </div>

        <div id="resultMessage" class="result"></div>
        </div>
    )
}


export default Buysellmain;