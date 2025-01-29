import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import MovieContextProvider from './context/MovieContext.jsx'
import FirebaseProvider from './context/FirebaseContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <FirebaseProvider>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>
    </FirebaseProvider>
    </BrowserRouter>
)
