import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieItems from './MovieItems';
import SeriesItems from './SeriesItems';
import Trends from './Trends';
import LazyLoad from 'react-lazyload'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function SeriesMiddle() {
    const [series, setSeries] = useState([])
    const [trends, setTrends] = useState([])
    const [seriesPage, setseriesPage] = useState(0);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/tv/day?api_key=97fadb736a602ca05a4e0b04494ea6c3&language=en-US',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
            }
        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response)
                setSeries(response.data.results)
            })
    }, [])

    return (
        <div className='flex flex-col justify-between p-8'>
            <div className='w-full flex flex-col gap-4'>
                <div className='grid grid-cols-4 gap-4 gap-y-6'>
                    {
                        series.map((item, index) => (
                            // console.log(item.backdrop_path)
                            <SeriesItems key={index} movie={item} id={item.id} image={item.poster_path} title={item.original_title} />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
