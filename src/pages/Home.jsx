import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Homemain from "../components/Homemain";


function Home(props) {

    return (
        <div>
            <Navbar logstatus='1' />
            <Homemain className = "mx"/>
            <Footer />
        </div>
    )

}

export default Home;