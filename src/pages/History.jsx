import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import History from "../components/Historymain";

function history(){

    return (
        <div>
            <Navbar/>
            <History></History>
            <Footer></Footer>
        </div>
    );

}


export default history;