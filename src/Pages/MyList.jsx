import React, { useContext, useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css';
import { assets } from '../assets/Assets/Front'
import { MovieContext } from '../context/MovieContext';
import MyFavourites from '../Components/MyFavourites';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  animator,
} from 'chart.js';
import { each } from 'chart.js/helpers';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function MyList() {
  const {fetchtheMovies}=useContext(MovieContext)
  const { favourites } = useContext(MovieContext)
  const { genre } = useContext(MovieContext)
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);
  const [selected6,setSelected6] = useState(false);
  const [sorting, setSorting] = useState([])
  const [genArray, setgenArray] = useState([])
  const [sortgenArray, setsortgenArray] = useState([])
  const [genreId, setGenreId] = useState(37)
  useEffect(()=>{
    const fetchData = async () => {
      const myMovies=await fetchtheMovies();
      setSorting([...myMovies])
    };
    fetchData();
  },[])
  useEffect(() => {
    let action = 0
    let Comedy = 0
    let thriller = 0
    let crime = 0
    let drama = 0
    let horror = 0
    let animation = 0
    let others = 0
    const countGenre = genre
    console.log("Hello there", countGenre)
    for (let count = 0; count < favourites.length; count++) {
      console.log("The actual Favourites are",favourites[count])
      let myGenres = favourites[count].genres[0].id
      console.log(myGenres)
      let countMygenre = countGenre.filter((gen) => gen.id == myGenres)
      console.log(countMygenre[0])
      if (countMygenre[0].name == 'Action') {
        action = action + 1
      }
      else if (countMygenre[0].name == 'Comedy') {
        Comedy = Comedy + 1
      }
      else if (countMygenre[0].name == 'Thriller') {
        thriller = thriller + 1
      }
      else if (countMygenre[0].name == 'Crime') {
        crime = crime + 1
      }
      else if (countMygenre[0].name == 'Drama') {
        drama = drama + 1
      }
      else if (countMygenre[0].name == 'Horror') {
        horror = horror + 1
      }
      else if (countGenre[0].name == 'Animation') {
        animation = animation + 1;
      }
      else {
        others = others + 1
      }
    }
    setgenArray([
      { name: 'Action', count: action },
      { name: 'Comedy', count: Comedy },
      { name: 'Thriller', count: thriller },
      { name: 'Crime', count: crime },
      { name: 'Drama', count: drama },
      { name: 'Horror', count: horror },
      { name: 'Animation', count: animation },
      { name: 'Others', count: others },
    ])
  }, [favourites, genre])

  useEffect(() => {
    setsortgenArray([...genArray].sort((a, b) => a.count - b.count));
  }, [genArray]);


  const handleBackground = (e) => {
    const id = e.target.parentElement.id
    console.log(typeof (id))
    if (id == '1') {
      setSelected1(true)
      setSelected2(false)
      setSelected3(false)
      setSelected4(false)
      setSelected5(false)
      setSelected6(false)
    }
    else if (id == '2') {
      setSelected2(true)
      setSelected1(false)
      setSelected3(false)
      setSelected4(false)
      setSelected5(false)
      setSelected6(false)
    }
    else if (id == '3') {
      setSelected3(true)
      setSelected1(false)
      setSelected2(false)
      setSelected4(false)
      setSelected5(false)
      setSelected6(false)
    }
    else if (id == '4') {
      setSelected4(true)
      setSelected1(false)
      setSelected2(false)
      setSelected3(false)
      setSelected5(false)
      setSelected6(false)
    }
    else if(id=='5') {
      setSelected5(true)
      setSelected1(false)
      setSelected2(false)
      setSelected3(false)
      setSelected4(false)
      setSelected6(false)
    }
    else
    {
      setSelected5(false)
      setSelected1(false)
      setSelected2(false)
      setSelected3(false)
      setSelected4(false)
      setSelected6(true)
    }

  }

  const handleSortingAsc = (type) => {
    const sorted = [...sorting].sort((a, b) => {
      if (type == 'rating') {
        return a.vote_average - b.vote_average
      }
      else {
        return a.popularity - b.popularity
      }

    })
    setSorting(sorted)
  }

  const handleSortingDesc = (type) => {
    const sorted = [...sorting].sort((a, b) => {
      if (type == 'rating') {
        return b.vote_average - a.vote_average
      }
      else {
        return b.popularity - a.popularity
      }
    })
    setSorting(sorted)
  }

  const handleGenre = (type) => {
    const myArray = genre
    console.log("Genreis",myArray)
    const myGenre = myArray.find((gen) => gen.name === type)
    const others=[28,35,53,80,18]
    const genIds=[]
    favourites.forEach(element => {
      genIds.push(element.genres[0].id)
    });
    console.log("These are",genIds)
    console.log("Thereme",myGenre)
    if (myGenre) {
      const myGenreId = myGenre.id
      console.log(myGenreId)
      setGenreId(myGenreId)
      console.log(favourites);
      const filteredFavourites = favourites.filter((fav) => fav.genres[0].id==myGenreId)
      console.log(filteredFavourites)
      setSorting(filteredFavourites)
    }
    else{
      console.log("There is such")
      console.log(others[0])
      const filteredFavourites = favourites.filter((fav) =>!others.includes(fav.genres[0].id))
      console.log(`There is the ${filteredFavourites}`)
      setSorting(filteredFavourites)
    }
  }


  return (
    <div className='flex flex-col gap-4 p-8'>
      <div className='flex flex-row w-full h-full'>
        <div className='fixed top-0 left-0 w-1/5 h-screen bg-black z-10'>
          <div className='flex flex-row items-center gap-6 ml-4 mb-10 mt-4'>
            <img src={assets.moviesIcon1} className='w-10 h-14 py-2' alt="" />
            <div className='text-2xl py-4 text-white'>CinemaFlex</div>
          </div>
          <div className='items-center justify-center px-4'>
            <div className='flex-grow'>
              <ul className='flex flex-col gap-4'>
                <div id='1' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected1 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-fist-raised text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('Action')}>Action</li>
                </div>
                <div id='2' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected2 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-theater-masks text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('Comedy')}>Comedy</li>
                </div>
                <div id='3' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected3 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-eye text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('Thriller')}>Thriller</li>
                </div>
                <div id='4' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected4 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-handcuffs text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('Crime')}>Crime</li>
                </div>
                <div id='5' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected5 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-mask text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('Drama')}>Drama</li>
                </div>
                <div id='6' className={`flex flex-row justify-center gap-4 items-center cursor-pointer border border-black rounded-xl ${selected6 ? 'bg-yellow-400' : 'bg-black'}`} onClick={handleBackground}>
                  <i className='fas fa-mask text-xl text-white'></i>
                  <li className='py-2 text-xl text-white' onClick={() => handleGenre('OTHER')}>Other</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className='ml-60 flex-1 relative mr-10'>
          <div className='flex flex-row justify-around'>
            <label htmlFor="sort-byR">
              <span className='mr-2 text-white'>Ratings</span>
              <select id="sort-byR" name="sortR" onChange={(e) => e.target.value == 'ASC' ? handleSortingAsc('rating') : handleSortingDesc('rating')}>
                <option value="" disabled selected>None</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </label>

            <label htmlFor="sort-by">
              <span className='mr-2 text-white'>Popularity</span>
              <select id="sort-byP" name="sortP" onChange={(e) => e.target.value == 'ASC' ? handleSortingAsc('popularity') : handleSortingDesc('popularity')}>
                <option value="" disabled selected>None</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </label>
          </div>
          <div className='w-full flex-1 overflow-auto scrollbar-hidden mt-10'>
            <table className='table-auto w-full'>
              <tr className='text-center'>
                <th className='p-2 text-left text-white'>Image</th>
                <th className='text-white'>Title</th>
                <th className='text-white'>Popularity</th>
                <th className='text-white'>Rating</th>
              </tr>
              {
                sorting.map((item, index) => (
                  <MyFavourites key={item.id} image={item.backdrop} title={item.original_title} popularity={item.popularity} rating={item.vote_average} />
                ))
              }
            </table>
          </div>
        </div>
      </div>
      <div className='w-100 h-100 ml-40 p-8'>
        <Doughnut className='w-full h-full'
          data={{
            labels: genArray.map((gen) => gen.name),
            datasets: [{
              data: genArray.map((gen) => gen.count),
              backgroundColor: ['blue', 'red', 'green', 'orange', 'yellow', 'pink', 'purple', 'brown'],
            },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
              },
            },
          }}
        />
      </div>
      <div className='w-full flex flex-col gap-4'>
        <h1 className='text-white text-lg text-center p-4'></h1>
        {/* <Suggested/> */}
      </div>
    </div>

  )
}
