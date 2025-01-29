import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Header from './Components/Header'
import './App.css'
const Home=React.lazy(()=>import('./Pages/Home'))
const MyList=React.lazy(()=>import('./Pages/MyList'))
const MovieCard=React.lazy(()=>import('./Components/MovieCard'))
const Series=React.lazy(()=>import('./Pages/Series'))
const SeriesCard=React.lazy(()=>import('./Components/SeriesCard'))
const Register=React.lazy(()=>import('./Pages/Register'))
const Login=React.lazy(()=>import('./Pages/Login'))
function App() {
  return (
    <>
    <Routes>
     <Route path='/home' element={<Suspense fallback={<div>Loading...</div>}><Home/></Suspense>}/>
     <Route path='/myList' element={<Suspense fallback={<div>Loading...</div>}><MyList/></Suspense>}/>
     <Route path='/movie/:movieId'element={<Suspense fallback={<div>Loading...</div>}><MovieCard/></Suspense>}/>
     <Route path='/series'element={<Suspense fallback={<div>Loading...</div>}><Series/></Suspense>}/>
     <Route path='/series/:seriesId/'element={<Suspense fallback={<div>Loading...</div>}><SeriesCard/></Suspense>}/>
     <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Register/></Suspense>}/>
     <Route path='/login' element={<Suspense fallback={<div>Loading...</div>}><Login/></Suspense>}/>
    </Routes>
    </>
  )
}

export default App
