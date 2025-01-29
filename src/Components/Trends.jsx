import React from 'react'

const Trends=({title,image})=>{
  return (
    <div className='flex flex-row cursor-pointer justify-center'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={"https://image.tmdb.org/t/p/w500/"+image} alt="" />
        </div>
    </div>
  )
}
export default Trends;
