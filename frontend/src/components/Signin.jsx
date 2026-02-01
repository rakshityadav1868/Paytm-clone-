import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
    const [username,SetUsername]=useState("")
    const [password,SetPassword]=useState("")
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="bg-white rounded-lg p-10 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>
        <p className="text-gray-500 text-center mb-8">Enter your credentials to login</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              name="username"
              onChange={(e)=>SetUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              onChange={(e)=>SetPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link to="/signup" className="font-semibold underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
