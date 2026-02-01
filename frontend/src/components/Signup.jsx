import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from "../services/api.js"
import "./Signup.css"

export default function Signup() {
    const [firstName, SetfirstName] = useState("")
    const [lastName, SetlastName] = useState("")
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!firstName || !lastName || !username || !password) {
            alert("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("/user/signup", {
                username,
                password,
                firstName,
                lastName
            })
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", username)
            localStorage.setItem("firstName", firstName)
            navigate("/dashboard")
        } catch (err) {
            console.log(err)
            alert("Sign up failed: " + (err.response?.data?.message || "Unknown error"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Header */}
                <div className="signup-header">
                    <h1 className="signup-title">Sign Up</h1>
                    <p className="signup-subtitle">Create your account to get started</p>
                </div>

                {/* Form */}
                <form className="signup-form" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="signup-form-group">
                        <label className="signup-label">First Name</label>
                        <input
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => SetfirstName(e.target.value)}
                            className="signup-input"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="signup-form-group">
                        <label className="signup-label">Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => SetlastName(e.target.value)}
                            className="signup-input"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="signup-form-group">
                        <label className="signup-label">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={username}
                            onChange={(e) => SetUsername(e.target.value)}
                            className="signup-input"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="signup-form-group">
                        <label className="signup-label">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            className="signup-input"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="signup-button"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="signup-divider">
                    <div className="signup-divider-line"></div>
                    <span className="signup-divider-text">OR</span>
                    <div className="signup-divider-line"></div>
                </div>

                {/* Footer */}
                <div className="signup-footer">
                    <p className="signup-footer-text">
                        Already have an account?{" "}
                        <Link to="/" className="signup-link">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
