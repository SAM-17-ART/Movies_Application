import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useFirebase } from './FirebaseContext'
export const MovieContext = createContext()
const MovieContextProvider = (props) => {
    const [genre, setGenre] = useState([])
    const firebase = useFirebase()
    const [favourites, setFavourites] = useState([])
    const fetchtheMovies = async () => {
        const getmyFavourites = await firebase.getTheMovies()
        const seen = new Set();
        const uniqueById = getmyFavourites.filter(item => {
            if (seen.has(item.id)) {
                return false;
            } else {
                seen.add(item.id);
                return true;
            }
        });
        console.log("My Uniqe Idis",uniqueById)
        setFavourites(uniqueById)
        return uniqueById
    }
    const addTofavourites = async (movie) => {
        await firebase.addtheMovies(movie)
        console.log("Mine", movie)
        if (!favourites.some(fav => fav.id === movie.id)) {
            await firebase.getTheMovies().then((movieElement) => setFavourites(movieElement))
        }
    }
    const removeFavourites = async(movie) => {
        const nfavourites = favourites.filter(fav => fav.id != movie.id)
        await firebase.removetheMovies(movie)
        setFavourites(nfavourites)
        
    }
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=97fadb736a602ca05a4e0b04494ea6c3&language=en-US',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
            }
        }
        axios
            .request(options)
            .then(function (response) {
                console.log("My Gneres are", response)
                setGenre(response.data.genres)
            }).catch(function (error) {
                console.log("Err", error)
            })
    }, [])
    // const removeFavourites=(movie)=>{
    //     favourites=favourites.filter(fav=>fav.id!=movie.id)
    // }
    const value = {
        favourites, setFavourites, addTofavourites, removeFavourites, genre, fetchtheMovies
    }
    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}
export default MovieContextProvider
