import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signinup.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/auth/auth";

function LoginComponent() {

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [formdata, setformdata] = useState(
        {
            username: "",
            password: ""
        }
    )
    const [t, sett] = useState("");

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();

            // Dispatch with correct payload format
            dispatch(loginUser({ accesstoken: data.accesstoken }));

            Navigate("/dash");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="authbody">
            <div className="login-container" id="loginContainer">
                <h1>Demo Trading Login</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label for="username" className="labelclass">Username:</label>
                        <input className="authinput" type="text" id="username" name="username" required onChange={handlechange}></input>
                    </div>
                    <div className="input-group">
                        <label for="password" className="labelclass">Password:</label>
                        <input className="authinput" type="password" id="password" name="password" required onChange={handlechange}></input>
                    </div>
                    <button className="authbutton" type="submit">Login</button>
                </form>
                <p id="error-message" className="error-message"></p>
            </div>
        </div>
    );
};

export default LoginComponent;