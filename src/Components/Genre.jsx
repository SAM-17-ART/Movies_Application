import React from 'react'

export default function Genre() {
  return (
    <div className='w-full flex flex-row justify-center gap-4 my-4 p-8'>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>ACTION</div>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>ADVENTURE</div>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>DRAMA</div>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>COMEDY</div>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>CRIME</div>
        <div className='text-center text-yellow-400 px-6 py-2 border border-yellow-400 rounded-2xl cursor-pointer'>OTHER</div>
    </div>
  )
}
