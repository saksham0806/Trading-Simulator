import "./Navbar.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/auth/auth";


function Navbar(props) {

    if (props.logstatus == '1') {

        return (
            <header>
                <div className="navcontainer">
                    <h1>Demo Trading</h1>
                    <nav>
                        <ul>
                            {/* <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li> */}
                            <li><Link to="/login" className="sbtn">Login</Link></li>
                            <li><Link to="/register" className="sbtn">Register</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
    else {
        return (
            <header>
                <div className="navcontainer">
                    <h1>Demo Trading</h1>
                    <nav>
                        <ul>
                            {/* <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li> */}
                            <li><Link to="/stock/IBM">Stocks</Link></li>
                            <li><Link to="/dash">Dashboard</Link></li>
                            <li><Link to="/buysell">Transact</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/login"  className="lbtn btn" onClick={()=>{logout()}}>Logout</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );

    }
}

export default Navbar;