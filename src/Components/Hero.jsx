import React, { useEffect, useState } from 'react'
import { Suspense } from 'react';
import { startTransition } from 'react';
import axios from 'axios';
const SearchBar=React.lazy(()=>import('./SearchBar'))
const Header=React.lazy(()=>import('./Header'))

export default function () {
    const[poster,setPoster]=useState('');
    const[title,setTitle]=useState('');
    useEffect(()=>{
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/movie/945961?api_key=97fadb736a602ca05a4e0b04494ea6c3',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
          }
        };
        
        axios
          .request(options)
          .then(function (response) {
            startTransition(()=>{
              setPoster("https://image.tmdb.org/t/p/original/"+response.data.backdrop_path)
             setTitle(response.data.results[1].title)
            }) 
            console.log("Good",response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
    },[])
    
  return (
    <div className='w-screen h-full relative'>
        <Suspense fallback={<div>Loading...</div>}>
          <Header/>   
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar/>
        </Suspense>
     
        <img className='w-full h-full bg-red-500 object-cover bg-opacity-30' src={poster} alt="" loading="lazy" />
        <p className='w-1/3 absolute -mt-80 ml-20 text-center text-8xl text-white'>{title}</p>
    </div>
  )
}
