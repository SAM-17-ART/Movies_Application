import React, { useEffect } from 'react'
import { Suspense } from 'react'
import { useFirebase } from '../context/FirebaseContext'
import { useNavigate } from 'react-router-dom'
// import Hero from '../Components/Hero'
const Hero=React.lazy(()=>import('../Components/Hero'))
const Genre=React.lazy(()=>import('../Components/Genre'))
const Movies=React.lazy(()=>import('../Components/Movies'))
const Footer=React.lazy(()=>import('../Components/Footer'))
// import Genre from '../Components/Genre'
// import Movies from '../Components/Movies'
// import Footer from '../Components/Footer'
export default function Home() {
  const firebase=useFirebase()
  const navigate=useNavigate()
  useEffect(()=>{
    if(!firebase.checkLoggedIn)
    {
      navigate('/')
    }
  },[])
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
       <Hero/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Genre/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer/>
      </Suspense>
{/*     
      <Genre/>
      <Movies/>
      <Footer/> */}
    </div>
  )
}
