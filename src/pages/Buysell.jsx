import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Buysellmain from "../components/Buysellmain"


function buysell(){

    return (
        <div>
            <Navbar/>
            <Buysellmain></Buysellmain>
            <Footer></Footer>
        </div>
    );

}


export default buysell;