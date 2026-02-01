import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from "../services/api.js"
import "./Send.css"

export default function Send() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [amount, setAmount] = useState("")

    // Get recipient info from URL params
    const recipientId = searchParams.get("id")
    const recipientName = searchParams.get("name") || "Friend"

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const res = await api.post("/account/transfer", {
                to: recipientId,
                amount: Number(amount)
            })
            alert("Transfer successful!")
            // Wait a moment for backend to complete, then navigate
            setTimeout(() => {
                navigate("/dashboard")
            }, 500)
        } catch (err) {
            console.log(err)
            alert("Transfer failed: " + (err.response?.data?.message || "Unknown error"))
        }
    }

    return (
        <div className="send-container">
            <div className="send-card">
                <div className="send-header">
                    <h1 className="send-title">Send Money</h1>
                </div>

                {/* Recipient Info */}
                <div className="recipient-info">
                    <div className="recipient-avatar">
                        {recipientName.charAt(0).toUpperCase()}
                    </div>
                    <div className="recipient-details">
                        <span className="recipient-label">Sending to</span>
                        <h2 className="recipient-name">{recipientName}</h2>
                    </div>
                </div>

                {/* Amount Form */}
                <form onSubmit={handleSubmit} className="send-form">
                    <div className="form-group">
                        <label className="form-label">Amount (in Rs)</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="amount-input"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="initiate-btn"
                    >
                        Initiate Transfer
                    </button>
                </form>
            </div>
        </div>
    )
}
