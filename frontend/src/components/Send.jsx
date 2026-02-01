import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Send() {
  const [searchParams] = useSearchParams()
  const [amount, setAmount] = useState("")

  // Get recipient info from URL params
  const recipientId = searchParams.get("id")
  const recipientName = searchParams.get("name") || "Friend"

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add backend logic here
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Send Money</h1>

        {/* Recipient Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {recipientName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-gray-600 text-sm">To</p>
            <p className="text-2xl font-bold">{recipientName}</p>
          </div>
        </div>

        {/* Amount Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Amount (in Rs)</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition text-lg"
          >
            Initiate Transfer
          </button>
        </form>
      </div>
    </div>
  )
}
