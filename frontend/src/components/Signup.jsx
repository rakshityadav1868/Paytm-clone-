import  { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from "../services/api.js"
export default function Signup() {
    const [firstName,SetfirstName]=useState("")
    const [lastName,SetlastName]=useState("")
    const [username,SetUsername]=useState("")
    const [password,SetPassword]=useState("")
    
    const navigate= useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response= await api.post("/user/signup",{
                username,
                password,
                firstName,
                lastName
            })
            // token save
            localStorage.setItem("token",response.data.token)
            //navigate
            navigate("/dashboard")
        }catch(err){
            console.log(err)
            alert("sign up failed")
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="bg-white rounded-lg p-10 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Sign Up</h1>
        <p className="text-gray-500 text-center mb-8">Enter your information to create an account</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-2">First Name</label>
            <input
              type="text"
              placeholder="John"
              name="firstName"
              onChange={(e)=>
                SetfirstName(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              name="lastName"
              onChange={(e)=>SetlastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Already have an account? <Link to="/signin" className="font-semibold underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
