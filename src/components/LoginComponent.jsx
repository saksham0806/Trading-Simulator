import React from "react";
import { useState } from "react";
import "./Signinup.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/auth/auth";

function LoginComponent() {
    const dispatch = useDispatch();
    const {accesstoken} = useSelector(state => state.auth);
    const [formdata, setformdata] = useState(
        {
            username: "",
            password: ""
        }
    )
    const [t,sett] = useState("");

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/auth/login", {  // Remove trailing slash
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
            dispatch(loginUser(data))
            console.log("Success:", data);

        } catch (error) {
            console.error("Error:", error);
        }



    };
    return (
        <div className="authbody">
            <div class="login-container" id="loginContainer">
                <h1>Demo Trading Login</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="username" className="labelclass">Username:</label>
                        <input className="authinput" type="text" id="username" name="username" required onChange={handlechange}></input>
                    </div>
                    <div class="input-group">
                        <label for="password" className="labelclass">Password:</label>
                        <input className="authinput" type="password" id="password" name="password" required onChange={handlechange}></input>
                    </div>
                    <button className="authbutton" type="submit">Login</button>
                </form>
                <p id="error-message" class="error-message"></p>
            </div>
        </div>
    );
};

export default LoginComponent;