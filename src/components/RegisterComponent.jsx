import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import './Signinup.css'

function RegisterComponent() {

    const [formdata, setformdata] = useState(
        {
            username: "",
            password: ""
        }
    )

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3000/auth/register", {  // Remove trailing slash
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
            console.log("Success:", data);

        } catch (error) {
            console.error("Error:", error);
        }



    };

    return (
        <div className="authbody">
            <div class="login-container">
                <h1>Demo Trading Registration</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="username" className="labelclass">Username:</label>
                        <input type="text" onChange={handlechange} id="username" name="username" required className="authinput" />
                    </div>
                    <div class="input-group">
                        <label for="password" className="labelclass">Password:</label>
                        <input type="password" onChange={handlechange} id="password" name="password" required className="authinput" />
                    </div>
                    <button type="submit" className="authbutton">Register                                                                                    </button>
                </form>
                <p id="error-message" class="error"></p>
            </div>
        </div>
    )
}

export default RegisterComponent;