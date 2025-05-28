import React from "react";
import "./Signinup.css";

function LoginComponent() {
    return (
        <div className="authbody">
            <div class="login-container" id="loginContainer">
                <h1>Demo Trading Login</h1>
                <form id="loginForm" action="/signinup" method="POST">
                    <div class="input-group">
                        <label for="username" className="labelclass">Username:</label>
                        <input className="authinput" type="text" id="username" name="username" required></input>
                    </div>
                    <div class="input-group">
                        <label for="password" className="labelclass">Password:</label>
                        <input className="authinput" type="password" id="password" name="password" required></input>
                    </div>
                    <button className="authbutton" type="submit">Login</button>
                </form>
                <p id="error-message" class="error-message"></p>
            </div>
        </div>
    );
};

export default LoginComponent;