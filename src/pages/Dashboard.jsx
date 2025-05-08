import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Dashmain from "../components/Dashmain";

function Dashboard(){

    return (
        <div>
            <Navbar logstatus='0' />
            <Dashmain/>
            <Footer />
        </div>
    )

}

export default Dashboard;