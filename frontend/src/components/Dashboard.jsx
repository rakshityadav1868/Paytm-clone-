import React, { useState } from 'react'

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("")

  const users = [
    { id: "U1", name: "User 1" },
    { id: "U2", name: "User 2" },
    { id: "U3", name: "User 3" },
  ]

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Payments App</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg">Hello, User</span>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold">U</div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="mb-8">
        <div className="text-2xl font-bold">
          Your Balance <span className="ml-4">$5000</span>
        </div>
      </div>

      {/* Users Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Users List */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="text-gray-600 mr-4">{user.id}</span>
                <span className="font-semibold text-lg">{user.name}</span>
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
