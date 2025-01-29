import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, doc, collection, addDoc, getDocs,query, where,updateDoc,deleteField, deleteDoc } from 'firebase/firestore'
const FirebaseContext = createContext(null)
const firebaseConfig = {
  apiKey: "AIzaSyD2eflwfrdZNy7AqwziOMtSzNjMbPie-sk",
  authDomain: "movie-app-f3923.firebaseapp.com",
  projectId: "movie-app-f3923",
  storageBucket: "movie-app-f3923.firebasestorage.app",
  messagingSenderId: "249082137733",
  appId: "1:249082137733:web:2e921a4a0136655210adec"
};
export const useFirebase = () => useContext(FirebaseContext)
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const database = getFirestore(firebaseApp)
const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user)
        { 
          console.log("User is",user)
          setUser(user)
        }
      else setUser(null)
    })
  }, [])
  const signupUserwithEmailandPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
  }
  const loginuserWithEmailandPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)

  }
  const signiinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
  }
  const signout=()=>{
    signOut(firebaseAuth)
  }

  const removetheMovies = async(movie)=>{
    const removedQuery=query(collection(database,'movies'),where('id','==',movie.id),where('userId','==',user.uid))
    const removedQuerySnapshot=await getDocs(removedQuery)
    console.log("My Removed Query is",removedQuerySnapshot)
    console.log(removedQuerySnapshot.docs[0].id)
    const removedMovie=await deleteDoc(doc(database,'movies',removedQuerySnapshot.docs[0].id))
    console.log("The Movie Removed is",removedMovie)
  }

  const addtheMovies = async (movie) => {
    return await addDoc(collection(database, 'movies'), {
      id: movie.id,
      original_title: movie.original_title,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
      genres: [{ id: movie.genres[0].id, name: movie.genres[0].name }],
      backdrop:movie.backdrop_path,
      userId: user.uid,
      userEmail: user.email

    })
  }
  const getTheMovies = async () => {
    const q= query(collection(database,'movies'),where('userId','==',user.uid))
    const querySnapshot = await getDocs(q)
    console.log("The actual querySnapshot is",querySnapshot)
    const favourites = querySnapshot.docs.map(doc => ({
      id:doc.id,
      ...doc.data(),
    }));
    return favourites

  }
  const checkLoggedIn = user ? true : false
  return (
    <FirebaseContext.Provider value={{ signupUserwithEmailandPassword, loginuserWithEmailandPassword, signiinWithGoogle, checkLoggedIn, addtheMovies, getTheMovies,signout,removetheMovies }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
export default FirebaseProvider
