import React, { useEffect, useState } from 'react'
import { Suspense } from 'react';
import axios from 'axios'
import MovieItems from './MovieItems';
const Trends=React.lazy(()=>import('./Trends'))
import LazyLoad from 'react-lazyload'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Movies() {
    const[movies,setMovies]=useState([])
    const[trends,setTrends]=useState([])
    const[moviesPage,setMoviesPage]=useState(0);
    useEffect(()=>{
        const options={
            method:'GET',
            url:'https://api.themoviedb.org/3/discover/movie?api_key=97fadb736a602ca05a4e0b04494ea6c3&primary_release_year=2024',
            headers:{
                accept:'application/json',
                Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
            }
        };
        axios
        .request(options)
        .then(function(response){
            console.log(response)
            setMovies(response.data.results)
        })
    },[])

    useEffect(()=>{
        const options={
            method:'GET',
            url:'https://api.themoviedb.org/3/trending/movie/day?api_key=97fadb736a602ca05a4e0b04494ea6c3',
            headers:{
                accept:'application/json',
                Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
            }
        };
        axios.request(options).then(function(response)
       {
        console.log("Hello",response);
        setTrends(response.data.results)
       })

    },[])

    const moviesperPage=5
    const totalPages=Math.ceil(trends.length/moviesperPage)
    const currentPageTrending=trends.slice(moviesPage*moviesperPage,(moviesPage+1)*moviesperPage)
    console.log("Hi",currentPageTrending);
    function nextPage(){
        if(moviesPage<totalPages-1)
        {
            console.log("Clicked")
            setMoviesPage(moviesPage+1);
        }
    }
    function previousPage(){
        if(moviesPage>0)
        {
            setMoviesPage(moviesPage-1)
        }
    }
  return (
    <div className='flex flex-col justify-between p-8'>
    <div className='w-full flex flex-col gap-4'>
        <div className='grid grid-cols-4 gap-4 gap-y-6'>
            {
                movies.map((item,index)=>(
                    // console.log(item.backdrop_path)
                    <MovieItems key={index} movie={item} id={item.id} image={item.poster_path} title={item.original_title}/>
                ))
            }
        </div>
    </div>
    <div className='flex flex-col items-center'>
        <div className='mt-4 mb-4'>
            <p className='text-2xl text-center py-2 text-white'>
                TRENDS NOW
            </p>
            <hr className='text-gray-400'/>
        </div>  
        <div className='flex flex-row gap-2 w-full h-full'>
            <div onClick={previousPage} className='flex flex-row justify-center items-center cursor-pointer'>
            <i className="fas fa-chevron-left text-2xl text-blue-500"></i>
            </div>
            {
                currentPageTrending.map((item,index)=>(
                    <LazyLoad 
                       key={index} 
                       height={200} 
                       offset={100} 
                       placeholder={<div className="bg-gray-300 h-full w-full">Loading...</div>} 
                     >
                       <Suspense fallback={<div>Loading...</div>}>
                       <Trends image={item.poster_path} title={item.original_title} />
                       </Suspense>     
                     </LazyLoad>
                ))
            }
            <div onClick={nextPage} className='flex flex-row justify-center items-center cursor-pointer'>
            <i className="fas fa-chevron-right text-2xl text-blue-500"></i>
            </div>
        </div>
        {/* <div>
            <button onClick={nextPage}>
                Forward
            </button>
            <button onClick={previousPage}>
                Backward
            </button>
        </div> */}
    </div>
    </div>
  )
}
