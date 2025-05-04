import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stockmain from "../components/Stockmain";

function Stock(prop) {

    const parameters = useParams();
    let selectedStock = parameters.slug;
    return (
        <div>
            <Navbar />
            <Stockmain stockName={selectedStock} />
            <Footer />
        </div>

    );
}

export default Stock;
