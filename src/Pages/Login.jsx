import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContext'
export default function Register() {
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const firebase=useFirebase()
const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault()
  await firebase.loginuserWithEmailandPassword(email,password)
}
useEffect(()=>{
    if(firebase.checkLoggedIn)
    {
        navigate('/')
    }
},[firebase,navigate])
  return (
    <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
      
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
            placeholder="you@example.com"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
            placeholder="********"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
     
        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-800">
            I agree to the <a href="#" class="text-indigo-600 underline">terms and conditions</a>.
          </label>
        </div>
  
       
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Login
        </button>
      </form>
  
    
      <button onClick={firebase.signiinWithGoogle} class="mt-6 w-full text-white  bg-red-600 rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200">
        Sign in With Google
      </button>
    </div>
  </div>
  
  )
}

