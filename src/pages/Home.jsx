import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Homemain from "../components/Homemain";
import "./Home.css"
function Home() {

    return (
        <div>
            <Navbar logstatus='1' />
            <Homemain className = "mx"/>
            <Footer />
        </div>
    )

}

export default Home;