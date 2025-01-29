import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SeriesSearchBar(){
  const[searchSeries,setSearchSeries]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    for(let page=0;page<=20;page++)
    {
      const options={
        method:'GET',
        url:`https://api.themoviedb.org/3/discover/tv?api_key=97fadb736a602ca05a4e0b04494ea6c3&page=${page+1}`,
        headers:{
            accept:'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2ZhZGI3MzZhNjAyY2EwNWE0ZTBiMDQ0OTRlYTZjMyIsIm5iZiI6MTcyNTkwNTA5OC42ODg0NjMsInN1YiI6IjY2ZGYzODMzNTNjOWRmOTBlOTNhZTAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTC--g4v8-9yFiFWsccBLXtFo6AtcJvS2NL3UfEDRf0'
        }
      }
      axios.request(options).then(function(response){
        console.log("Hello there myself",response.data)
        setSearchSeries(response.data.results)
      })
    }
    
  },[])

  const handleClick=(id)=>
  {
    const linkTag=document.createElement('a')
    navigate(`/series/${id}`)
    return linkTag
  }

  const showSuggestions=()=>{
    const input=document.getElementById("searchInput").value.toLowerCase()
    const suggestionsList=document.getElementById("suggestionsList")
    suggestionsList.innerHTML=""
    if(input.trim()==="")
    {
      suggestionsList.classList.add("hidden")
      return
    }
    const filteredSuggestions=searchSeries.filter(item=>item.original_name.toLowerCase().includes(input))
    if (filteredSuggestions.length > 0) {
      filteredSuggestions.forEach(suggestion => {
        const listItem = document.createElement("li");
        listItem.className =
          "px-4 py-2 hover:bg-gray-200 cursor-pointer";
        listItem.textContent = suggestion.original_name;
        listItem.addEventListener('click',()=>handleClick(suggestion.id))
        suggestionsList.appendChild(listItem);
      });
      suggestionsList.classList.remove("hidden");
    } else {
      suggestionsList.classList.add("hidden");
    }
  }

  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center mt-2 gap-2'>
    <div className="relative flex flex-row items-center justify-center w-full mt-2 gap-2">
    <input
      className="w-full max-w-lg px-4 py-2 text-lg text-black bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Search for movies, series, or lists..."
      id="searchInput"
      onInput={showSuggestions}
    />
    <button
      className="px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all text-lg font-semibold"
    >
      Search
    </button>
    </div>
    <ul id="suggestionsList" className="absolute top-96 mt-2 w-full max-w-lg items-center justify-center bg-white border border-gray-300 rounded-lg shadow-lg text-black hidden overflow-y-auto scrollbar-hidden max-h-60 -ml-32"> 
      
    </ul>
    </div>
 
  )
}
export default React.memo(SeriesSearchBar)

