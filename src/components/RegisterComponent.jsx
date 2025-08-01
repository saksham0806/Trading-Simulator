import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Signinup.css'

function RegisterComponent() {
    const Navigate = useNavigate();
    const [formdata, setformdata] = useState(
        {
            username: "",
            password: ""
        }
    )
    const [errorMsg, setErrorMsg] = useState(""); // Add error message state

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
            let res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });

            if (!res.ok) {
                setErrorMsg("Username already exists");
                const container = document.getElementById("loginContainer");
                container.classList.add("shake");
                setTimeout(() => {
                    container.classList.remove("shake");
                }, 500);
                return;
            }

            const data = await res.json();
            console.log("Success:", data);

        } catch (error) {
            setErrorMsg("Username already exists");
            const container = document.getElementById("loginContainer");
            container.classList.add("shake");
            setTimeout(() => {
                container.classList.remove("shake");
            }, 500);
            return;
        }
    };

    return (
        <div className="authbody">
            <div className="login-container" id="loginContainer">
                <h1>Demo Trading Registration</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="labelclass">Username:</label>
                        <input type="text" onChange={handlechange} id="username" name="username" required className="authinput" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="labelclass">Password:</label>
                        <input type="password" onChange={handlechange} id="password" name="password" required className="authinput" />
                    </div>
                    <button type="submit" className="authbutton">Register</button>
                </form>
                {errorMsg && (
                    <p id="error-message" className="error-message" style={{ display: "block" }}>{errorMsg}</p>
                )}
                <p style={{ marginTop: "20px", color: "#555" }}>
                    Already a user?{" "}
                    <span
                        style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
                        onClick={() => Navigate("/login")}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default RegisterComponent;