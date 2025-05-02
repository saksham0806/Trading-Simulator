import React from "react";
import "./Stock.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Stock(prop){
    return (
        <div>
            <Navbar/>
            <Footer/>
        </div>

    );
}

export default Stock;
