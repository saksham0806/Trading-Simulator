import React from "react";
import "./Navbar.css"

function Navbar(props) {
    if (props.logstatus == '1') {

        return (
            <header>
                <div className="navcontainer">
                    <h1>Demo Trading</h1>
                    <nav>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="signinup.html" className="sbtn">Login</a></li>
                            <li><a href="register.html" className="sbtn">Register</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
    else {
        return (
            <header>
                <div class="navcontainer">
                    <h1>Demo Trading</h1>
                    <nav>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="signinup.html" class="lbtn btn">Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );

    }
}

export default Navbar;