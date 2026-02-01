import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../services/api.js"
import "./Signin.css"

export default function Signin() {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    const handlesignin = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("/user/signin", {
                username,
                password
            })
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("firstName", response.data.firstName)
            navigate("/dashboard")
        } catch (err) {
            console.log(err)
            alert("Sign in failed: " + (err.response?.data?.message || "Invalid credentials"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-card">
                {/* Header */}
                <div className="signin-header">
                    <h1 className="signin-title">Sign In</h1>
                    <p className="signin-subtitle">Welcome back to your account</p>
                </div>

                {/* Form */}
                <form className="signin-form" onSubmit={handlesignin}>
                    {/* Email */}
                    <div className="signin-form-group">
                        <label className="signin-label">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={username}
                            onChange={(e) => SetUsername(e.target.value)}
                            className="signin-input"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="signin-form-group">
                        <label className="signin-label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            className="signin-input"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="signin-button"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="signin-divider">
                    <div className="signin-divider-line"></div>
                    <span className="signin-divider-text">OR</span>
                    <div className="signin-divider-line"></div>
                </div>

                {/* Signup Link */}
                <div className="signin-footer">
                    <p className="signin-footer-text">
                        Don't have an account?{" "}
                        <Link to="/signup" className="signin-link">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
