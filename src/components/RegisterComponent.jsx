import React from "react";
import { Link } from "react-router-dom";
import './Signinup.css'

function RegisterComponent() {
    return (
        <div className="authbody">
            <div class="login-container">
                <h1>Demo Trading Registration</h1>
                <form id="loginForm" action="/register" method="POST">
                    <div class="input-group">
                        <label for="username" className="labelclass">Username:</label>
                        <input type="text" id="username" name="username" required className="authinput"/>
                    </div>
                    <div class="input-group">
                        <label for="password" className="labelclass">Password:</label>
                        <input type="password" id="password" name="password" required className="authinput"/>
                    </div>
                    <button type="submit" className="authbutton">Register                                                                                    </button>
                </form>
                <p id="error-message" class="error"></p>
            </div>
        </div>
    )
}

export default RegisterComponent;