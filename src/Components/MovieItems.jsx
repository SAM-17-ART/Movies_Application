import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import { Link } from 'react-router-dom'

const MovieItems=({id,image})=>{
 
  return (
    <Link to={`/movie/${id}`}>
   <div className='text-gray cursor-pointer group'>
    <div className='overflow-hidden w-full h-full rounded-xl'>
        <img className='hover:scale-110 transition ease-in-out' src={"https://image.tmdb.org/t/p/w400/"+image} alt="" />
    </div>
   </div>
   </Link>
  )
}
export default MovieItems
