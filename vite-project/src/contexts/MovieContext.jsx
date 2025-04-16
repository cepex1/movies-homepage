import { createContext, useContext, useState, useEffect } from "react";
import Favorites from "../pages/Favorites";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext) // Custom hook to use the MovieContext

export const MovieProvider = ({ children }) => { 
    const [favorites, setFavorites] = useState([]) // State to hold favorite movies

    useEffect(() => { // Load favorites from local storage when the component mounts
        const storedFavs = localStorage.getItem("favorites")
    if (storedFavs) setFavorites(JSON.parse(storedFavs)) // Parse and set the favorites from local storage
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites)) // Update local storage whenever favorites change
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]) // Add a movie to favorites
    }
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter((movie) => movie.id !== movieId)) // Remove a movie from favorites
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId) // Check if a movie is in favorites
    }

    const value = { // Context value to be provided to children
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

}

export default MovieContext; // Export the MovieContext for use in other components