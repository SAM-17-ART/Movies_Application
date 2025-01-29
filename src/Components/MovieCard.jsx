import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css';
import { assets } from '../assets/Assets/Front';
import { MovieContext } from '../context/MovieContext';
import { useEffect } from 'react'
export default function MovieCard({ }) {
  const { movieId } = useParams()
  const [image, setImage] = useState('')
  const [movieItem, setMovieItem] = useState([])
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [trailer, setTrailer] = useState('')
  const [runTime, setrunTime] = useState('')
  const [popularity, setPopularity] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [overview, setOverView] = useState('')
  const { addTofavourites, removeFavourites, favourites } = useContext(MovieContext)
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=97fadb736a602ca05a4e0b04494ea6c3`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
      }
    };
    axios.request(options).then(function (response) {
      setPopularity(response.data.vote_average)
      setOverView(response.data.overview)
      setrunTime(response.data.runtime)
      setImage("https://image.tmdb.org/t/p/original/" + response.data.poster_path)
      setTitle(response.data.title)
      setYear(response.data.release_date)
      setMovieItem(response.data)
      console.log("This is Mine and is", response)
    })
  }, [movieId])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=97fadb736a602ca05a4e0b04494ea6c3`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
      }
    };
    axios.request(options).then(function (response) {
      console.log("My Video is", response)
      setTrailer(`https://www.youtube.com/watch?v=${response.data.results[1].key}`)
    })
  }, [movieId])

  const handleVisibility = () => {
    if (visibility) {
      setVisibility(false)
    }
    else {
      setVisibility(true)
    }
  }
  console.log("The actual favourites are", favourites)

  const isFavourite = favourites.some(fav => fav.id == movieItem.id)
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourites(movieItem)
    }
    else {
      addTofavourites(movieItem);
    }
  }
  return !visibility ? (
    <div className='relative min-h-screen'>
      <div style={{ backgroundImage: `url(${assets.MoviePoster})` }} className="absolute inset-0 bg-cover bg-center opacity-10"></div>
      <div className='relative z-10 flex flex-row justify-between p-8'>
        <div className='w-80 flex flex-col justify-center gap-8 ml-10 mt-10'>
          <div className='text-white font-bold text-4xl text-left'>
            {title}
            <span className='text-gray-500 font-bold text-2xl ml-4'>{year.substring(0, 4)}</span>
          </div>
          <div className='flex flex-row gap-8 justify-between'>
            <div className='flex flex-row items-center gap-4'>
              <a href={trailer}>
                <i className="fas fa-play text-red-600 border rounded-2xl p-2 border-red-600 cursor-pointer"></i>
              </a>
              <h1 className='text-xl text-white'>Watch Trailer</h1>
            </div>
            <div className='flex flex-row items-center gap-4'>
              {/* {!isFavourite? (<i onClick={()=>addTofavourites(movieItem)} className="fas fa-heart text-red-600 border rounded-2xl p-2 border-red-600 cursor-pointer"></i>):(<i onClick={()=>removeFavourites(movieItem)} className="fas fa-heart text-red-600 border rounded-2xl p-2 border-red-600 cursor-pointer"></i>)} */}
              <i onClick={toggleFavourite} className={`fas fa-heart ${isFavourite ? 'text-red-600' : 'text-pink-600'} border rounded-2xl p-2 border-red-600 cursor-pointer`}></i>
              <h1 className='text-xl text-white'>Add to Favoutites</h1>
            </div>
          </div>
          <div className='flex flex-row items-center gap-8 justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <i className='fas fa-star text-yellow-500'></i>
              <h2 className='text-white'>{parseInt(popularity).toFixed(1)}/10</h2>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <h1 className='text-white'>RunTime</h1>
              <h2 className='text-white'>{runTime}</h2>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <h1 className='text-white'>Year</h1>
              <h2 className='text-white'>{year.substring(0, 4)}</h2>
            </div>
          </div>
          <div className='p-2 rounded-2xl bg-pink-700 text-white cursor-pointer' onClick={() => handleVisibility()}>
            More Details
          </div>
        </div>
        <div className='w-80 h-84 mt-6 mr-32'>
          <img className='w-full h-full object-contain' src={image} alt="" />
        </div>
      </div>
    </div>
  ) : <div className='relative min-h-screen'>
    <div style={{ backgroundImage: `url(${assets.MoviePoster})` }} className="absolute inset-0 bg-cover bg-center opacity-10"></div>
    <div className='relative z-10 flex flex-row justify-between p-8'>
      <div className='w-80 flex flex-col justify-center gap-8 ml-10 mt-4'>
        <div className='text-white font-bold text-4xl text-left'>
          {title}
          <span className='text-gray-500 font-bold text-2xl ml-4'>{year.substring(0, 4)}</span>
        </div>
        <div className='flex flex-row gap-8 justify-between'>
          <div className='flex flex-row items-center gap-4'>
            <a href={trailer}>
              <i className="fas fa-play text-red-600 border rounded-2xl p-2 border-red-600 cursor-pointer"></i>
            </a>
            <h1 className='text-xl text-white'>Watch Trailer</h1>
          </div>
          <div className='flex flex-row items-center gap-4'>
            <i onClick={toggleFavourite} className={`fas fa-heart ${isFavourite ? 'text-red-600' : 'text-pink-600'} border rounded-2xl p-2 border-red-600 cursor-pointer`}></i>
            <h1 className='text-xl text-white'>Add to Favoutites</h1>
          </div>
        </div>
        <div className='text-white text-left'>
          {overview}
        </div>
        <div className='flex flex-row items-center gap-8 justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <i className='fas fa-star text-yellow-500'></i>
            <h2 className='text-white'>{parseInt(popularity).toFixed(1)}/10</h2>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <h1 className='text-white'>RunTime</h1>
            <h2 className='text-white'>{runTime}</h2>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <h1 className='text-white'>Year</h1>
            <h2 className='text-white'>{year.substring(0, 4)}</h2>
          </div>
        </div>
        <div className='p-2 rounded-2xl bg-pink-700 text-white cursor-pointer' onClick={() => handleVisibility()}>
          Hide Details
        </div>
      </div>
      <div className='w-80 h-84 mt-6 mr-32'>
        <img className='w-full h-full object-contain' src={image} alt="" />
      </div>
    </div>
  </div>
}
