import React from 'react'
import { assets } from '../assets/Assets/Front'

export default function Footer() {
  return (
    <div className='mt-6 flex flex-row items-center justify-between w-full p-8'>
        <div>
            <img className='w-10 h-10' src={ assets.moviesIcon1 } alt="" />
        </div>
        <div className='flex flex-row justify-between items-center gap-6'>
            <p className='text-xl px-2'>MAIN</p>
            <p className='text-xl px-2'>MOVIES</p>
            <p className='text-xl px-2'>NEWS</p>
            <p className='text-xl px-2'>CONTACTS</p>
        </div>
        <div className='flex flex-row items-center gap-6'>
        <img className='w-7' src={assets.fbIcon} alt="" />
        <img className='w-12' src={assets.xIcon} alt="" />
        </div>
    </div>
  )
}
