import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContext'
import { Link } from 'react-router-dom'
export default function Register() {
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const firebase=useFirebase()
const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault()
  await firebase.signupUserwithEmailandPassword(email,password)
}
useEffect(()=>{
    console.log("The firebase is Logged in",firebase.checkLoggedIn)
    if(firebase.checkLoggedIn)
    {
        navigate('/home')
    }
},[firebase,navigate])
  return (
    <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
      
        <div class="mb-4">
          <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
            placeholder="you@example.com"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        
        <div className="mb-4">
          <label htmlFor="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
            placeholder="********"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
     
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="terms" className="ml-2 block text-sm text-gray-800">
            I agree to the <a href="#" class="text-indigo-600 underline">terms and conditions</a>.
          </label>
        </div>
  
       
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Create Account
        </button>
      </form>
  
    
      <p class="mt-4 text-sm text-center text-gray-600">
        Already have an account?
        <Link to={'/login'}>
        <span className="text-indigo-600 font-medium hover:underline ml-2">Login</span>
        </Link>
      </p>
    </div>
  </div>
  
  )
}
