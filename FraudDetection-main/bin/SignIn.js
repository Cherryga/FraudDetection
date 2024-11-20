
import React, { useState } from "react";
import axios from "axios";

function SignIn() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/login", credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert(response.data.message); // Show success message
        } catch (error) {
            console.error("Login error:", error.response?.data?.error || "An error occurred");
            setErrorMessage(error.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default SignIn;
