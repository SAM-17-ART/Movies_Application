import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import { Link } from 'react-router-dom'

const SeriesItems=({id,image})=>{
  const{addTofavourites}=useContext(MovieContext)
  return (
    <Link to={`/series/${id}`}>
   <div className='text-gray cursor-pointer group'>
    <div className='overflow-hidden w-full h-full rounded-xl'>
        <img className='hover:scale-110 transition ease-in-out' src={"https://image.tmdb.org/t/p/w500/"+image} alt="" />
    </div>
   </div>
   </Link>
  )
}
export default SeriesItems
