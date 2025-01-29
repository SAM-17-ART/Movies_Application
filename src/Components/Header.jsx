import React from 'react'
import { assets } from '../assets/Assets/Front'
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
function Header() {
const firebase=useFirebase()
const navigate=useNavigate()
  const signOut=async(e)=>{
    e.preventDefault()
    await firebase.signout()
    navigate('/')
  }
  return (
    <div className='flex flex-row justify-between items-center w-full absolute mt-5 z-10'>
        <div>
            <img className='w-10 h-10 ml-4' src={assets.moviesIcon1} alt="" />
        </div>
        <div className='flex flex-row justify-between items-center gap-6'>
            <NavLink to='/'>
            <p className='text-xl px-2 text-white font-bold cursor-pointer'>Home</p>
            </NavLink>
           
            <NavLink to='/series'>
            <p className='text-xl px-2 text-white font-bold cursor-pointer'>Series</p>
            </NavLink>
          
            <NavLink to='/myList'>
            <p className='text-xl px-2 text-white font-bold cursor-pointer'>My List</p>
            </NavLink>
           
        </div>
        <div className='px-4 py-1 border rounded-lg mr-16'>
        <h1 className="text-white" onClick={signOut}>Sign Out</h1>
        </div>
       
    </div>
  )
}
export default React.memo(Header)
