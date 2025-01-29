import React, { Suspense } from 'react'
// import SeriesHero from '../Components/SeriesHero'
const SeriesHero=React.lazy(()=>import('../Components/SeriesHero'))
const SeriesMiddle=React.lazy(()=>import('../Components/SeriesMiddle'))
// import SeriesMiddle from '../Components/SeriesMiddle'

export default function Series() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SeriesHero/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
       <SeriesMiddle/>
      </Suspense>

    </div>
  )
}
