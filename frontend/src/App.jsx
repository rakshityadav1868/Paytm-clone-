import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup.jsx"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"
import Send from "./components/Send"

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route  path="/signup" element={<Signup/>}/>
      <Route  path="/" element={<Signin/>}/>
      <Route  path="/dashboard" element={<Dashboard/>}/>
      <Route  path="/send" element={<Send/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
