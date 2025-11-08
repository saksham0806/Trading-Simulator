import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Signinup.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/auth/auth";

function LoginComponent() {

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [formdata, setformdata] = useState(
        {
            username: "",
            password: ""
        }
    )
    const [t, sett] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); // Add error message state
    const [successMsg, setSuccessMsg] = useState(""); // Add success message state

    useEffect(() => {
        // Check for success message in URL params
        const success = searchParams.get('registered');
        if (success === 'true') {
            setSuccessMsg('User successfully registered! Please login.');
            // Clear the message after 5 seconds
            setTimeout(() => setSuccessMsg(''), 5000);
        }
    }, [searchParams]);

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(""); // Reset error message
        try {
            let res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });

            if (!res.ok) {
                setErrorMsg("Invalid username or password");
                const container = document.getElementById("loginContainer");
                container.classList.add("shake");
                setTimeout(() => {
                    container.classList.remove("shake");
                }, 500);
                return;
            }
            const data = await res.json();

            dispatch(loginUser({ accesstoken: data.accessToken }));

            Navigate("/dash");
        } catch (error) {
            setErrorMsg("Invalid username or password"); // Show error on network/fetch error
            console.error("Error:", error);
        }
    };
    return (
        <div className="authbody">
            <div className="login-container" id="loginContainer">
                <h1>Demo Trading Login</h1>
                {successMsg && (
                    <p className="success-message">{successMsg}</p>
                )}
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="labelclass">Username:</label>
                        <input className="authinput" type="text" id="username" name="username" required onChange={handlechange}></input>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="labelclass">Password:</label>
                        <input className="authinput" type="password" id="password" name="password" required onChange={handlechange}></input>
                    </div>
                    <button className="authbutton" type="submit">Login</button>
                </form>
                {errorMsg && (
                    <p id="error-message" className="error-message" style={{ display: "block" }}>{errorMsg}</p>
                )}
                <p style={{ marginTop: "20px", color: "#555" }}>
                    Not a user?{" "}
                    <span
                        style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
                        onClick={() => Navigate("/register")}
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;