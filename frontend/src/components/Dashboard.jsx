import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../services/api.js"
import "./Dashboard.css"

export default function Dashboard() {
    const navigate = useNavigate()
    const [users, SetUser] = useState([])
    const [filter, Setfilter] = useState("")
    const [balance, setBalance] = useState(0)
    const username = localStorage.getItem("username") || "User"
    const firstName = localStorage.getItem("firstName") || username

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate("/")
    }

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await api.get(`/user/bulk?filter=${filter}`)
                // Filter out current user - only show other users
                const loggedInUser = localStorage.getItem("username")
                console.log("Logged in user:", loggedInUser)
                console.log("All users from API:", res.data.users)
                const filteredUsers = res.data.users.filter(user => {
                    console.log(`Comparing: "${user.username}" !== "${loggedInUser}" = ${user.username !== loggedInUser}`)
                    return user.username !== loggedInUser
                })
                console.log("Filtered users:", filteredUsers)
                SetUser(filteredUsers)
            } catch (err) {
                console.log(err)
            }
        }
        fetchuser()
    }, [filter])

    useEffect(() => {
        const fetchbalance = async () => {
            try {
                const res = await api.get(`/account/balance`)
                setBalance(res.data.balance)
            } catch (err) {
                console.log(err)
            }
        }
        fetchbalance()
    }, [])

    const handleSendMoney = (user) => {
        navigate(`/send?id=${user._id}&name=${user.firstName}`)
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h1 className="app-title">Payments App</h1>
                <div className="user-menu">
                    <span className="user-greeting">Hello, {firstName}</span>
                    <div className="user-avatar">
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Balance Section */}
                <div className="balance-card">
                    <span className="balance-label">Your Balance</span>
                    <div className="balance-amount">₹ {balance}</div>
                </div>

                {/* Users Section */}
                <div className="users-section">
                    <h2 className="users-section-title">Users</h2>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={filter}
                        onChange={(e) => Setfilter(e.target.value)}
                        className="search-input"
                    />

                    {/* Users List */}
                    <div className="users-list">
                        {users.map((user) => (
                            <div key={user._id} className="user-card">
                                <div className="user-info-left">
                                    <div className="user-avatar">
                                        {user.firstName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-details">
                                        <h3 className="user-name">
                                            {user.firstName} {user.lastName}
                                        </h3>
                                        <p className="user-email">{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSendMoney(user)}
                                    className="send-money-btn"
                                >
                                    Send Money
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
