import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css';
import { assets } from '../assets/Assets/Front';
import { MovieContext } from '../context/MovieContext';
import { useEffect } from 'react'
import Trends from './Trends';
export default function SeriesCard({ }) {
  const { seriesId } = useParams()
  const [poster, setPoster] = useState('')
  const [title, setTitle] = useState()
  const [release, setRelease] = useState()
  const [genre, setGenre] = useState()
  const [genreList, setGenreList] = useState([])
  const [popularity, setPopularity] = useState()
  const [cast, setCast] = useState([])
  const [posterPath, setPosterPath] = useState()
  const [overview, setOverview] = useState()
  const [showAll, setShowAll] = useState(false);
  const [seasons, setSeasons] = useState([])
  const[trailer,setTrailer]=useState()
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(3)
  const limit = 5;
  const toggleShowAll = () => {
    console.log("Button clicked!")
    setShowAll((prevState) => !prevState);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const seriesResponse = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=97fadb736a602ca05a4e0b04494ea6c3`);
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=97fadb736a602ca05a4e0b04494ea6c3`);
        const videosResponse = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=97fadb736a602ca05a4e0b04494ea6c3`);
        
        // Set the data from the responses
        setPoster(`https://image.tmdb.org/t/p/original/${seriesResponse.data.backdrop_path}`);
        setTitle(seriesResponse.data.name);
        setRelease(seriesResponse.data.first_air_date);
        setGenre(seriesResponse.data.genres[0].name);
        setPosterPath(`https://image.tmdb.org/t/p/original/${seriesResponse.data.poster_path}`);
        setOverview(seriesResponse.data.overview);
        setSeasons(seriesResponse.data.seasons);
        setPopularity(seriesResponse.data.vote_average);
        setGenreList(seriesResponse.data.genres);
        
        setCast(creditsResponse.data.cast);
        
        // Set trailer URL
        if (videosResponse.data.results.length > 0) {
          setTrailer(`https://www.youtube.com/watch?v=${videosResponse.data.results[0].key}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (seriesId) {
      fetchData();
    }
  }, [seriesId]);
  const showLeft = () => {
    if (left > 0) {
      setRight(right - 3)
      setLeft(left - 3)
    }

  }
  const showRight = () => {
    if (right < seasons.length) {
      setRight(right + 3)
      setLeft(left + 3)
    }
  }
  return (
    <div className='w-screen h-full flex flex-col gap-4'>
      <div className='w-screen relative bg-green-600'>
        <div className='absolute top-72 left-60 h-80 z-10'>
          <img className='w-60 h-96 bg-red-500 object-cover bg-opacity-15' src={posterPath} alt="" />
        </div>
        <div className='absolute w-full h-full bg-black bg-opacity-40'></div>
        <div className='absolute w-full top-1/2 left-1/8 flex flex-col items-center justify-center mt-2 gap-2'>
          <div className='text-white text-left font-bold text-3xl -mt-10'>{title}</div>
          <div></div>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-row gap-2'>
              <i className='fas fa-calendar text-xl text-white'></i>
              <div className='text-white font-semibold text-lg'>{Date(release).substring(4, 15)}</div>
            </div>
            <div className='flex flex-row gap-2'>
              <i className='fas fa-tag text-xl text-white'></i>
              <div className='text-white font-semibold text-lg'>{genre}</div>
            </div>
          </div>
        </div>
        <div className='absolute w-1/4 top-80 right-0 flex flex-row'>
          <a href={trailer}> 
          <div className='border rounded-xl p-2 text-white font-semibold'>
            WATCH TRAILER
          </div>
          </a>
        </div>
        <img className='w-full h-96 bg-red-500 object-cover bg-opacity-15' src={poster} alt="" />
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-row gap-2 w-full'>
          <div className="w-1/4 flex flex-col items-center">
            <div className="flex flex-col gap-4 w-3/4 max-h-[50vh] mt-80 ml-80 mb-2 p-4 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg overflow-y-scroll z-10 !scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
              <div className="font-bold text-lg text-white border-b border-gray-700 pb-2">Cast Overview</div>
              {cast.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
                  <p className="text-sm font-medium">No cast information available.</p>
                  <img
                    className="w-32 h-32 mt-4"
                    src="https://via.placeholder.com/150?text=No+Image"
                    alt="No cast available"
                  />
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {(showAll ? cast : cast.slice(0, limit)).map((ele, index) => (
                    <li
                      key={index}
                      className="flex flex-row gap-4 items-center bg-gray-700 rounded-md shadow-md p-3 hover:bg-gray-600 transition"
                    >
                      <a href>
                      <div>
                        <img
                          className="w-16 h-16 rounded-full border-2 border-gray-500 object-cover"
                          src={`https://image.tmdb.org/t/p/original/${ele.profile_path}`}
                          alt={ele.name}
                        />
                      </div>
                      </a>
                      <div className="flex flex-col">
                        <div className="text-white text-sm font-semibold">{ele.name}</div>
                        <div className="text-gray-400 text-xs">{ele.character}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cast.length > limit && (
                <button
                  onClick={toggleShowAll}
                  className="mt-4 text-blue-400 font-medium text-sm hover:text-blue-500"
                >
                  {showAll ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 w-3/4 mx-auto">
            <div className='h-40 flex flex-col gap-4'>
              <div className="text-gray-400 font-bold text-xl text-left ml-44 mt-1">
                Synopsis
              </div>
              <div className="font-sans text-left font-medium text-gray-300 ml-44 mr-8 leading-relaxed">
                {overview}
              </div>
              <div className='flex flex-row gap-7'>
                <div className='flex flex-row gap-2 ml-44'>
                  <i className='fas fa-star text-yellow-500 mt-1'></i>
                  <div className='text-xl font-bold text-white'>{popularity}</div>
                </div>
                <div className='flex flex-row gap-1'>
                  {
                    genreList.map((element, index) => (
                      <div key={index} className='text-white font-bold text-lg'>
                        {index == genreList.length - 1 ? `${element.name}` : `${element.name} |`}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-6'>
              <h1 className='text-gray-400 font-bold mt-32 text-xl text-center'>SEASONS</h1>
            <div className="ml-44 flex flex-wrap items-center gap-6 relative">
              <div className="flex flex-row gap-6 overflow-hidden">
                <i onClick={showLeft}
                  className="fas fa-chevron-left text-3xl ml-8 mt-24 text-blue-500 cursor-pointer transform -translate-x-6 hover:scale-110 transition-transform duration-200"
                ></i>
                {seasons.slice(left, right).map((ele, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity duration-300"
                  >
                    <a href={`https://api.themoviedb.org/3/tv/${seriesId}/season/${ele.season_number}/videos?api_key=97fadb736a602ca05a4e0b04494ea6c3`}>
                    <div className="w-36 overflow-hidden rounded-lg shadow-lg">
                      <img
                        className="hover:scale-105 transition-transform duration-300 ease-in-out"
                        src={`https://image.tmdb.org/t/p/w200/${ele.poster_path}`}
                        alt={`Season ${index}`}
                      />
                    </div>
                    </a>
                    <div className="text-gray-400 text-sm font-medium text-center">
                      Season {ele.season_number}
                    </div>
                  </div>
                ))}
                <i
                  onClick={showRight}
                  className="fas fa-chevron-right text-3xl mr-10 mt-24 text-blue-500 cursor-pointer transform translate-x-6 hover:scale-110 transition-transform duration-200"
                ></i>
              </div>



            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}