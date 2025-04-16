import MovieCard from "../components/MovieCard";
import { useState, useEffect, use } from "react";
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); // State to hold the list of movies
  const [error, setError] = useState(null); // State to hold any error messages
  const [loading, setLoading] = useState(true); // State to indicate loading status

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies); // Set the movies state with the fetched data
      } catch (err) {
        console.error(err); // Log the error to the console
        setError("Failed to fetch popular movies. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies(); // Call the function to load popular movies
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!searchQuery.trim()) return; // Ignore empty search queries
    if (loading) return; // Ignore if already loading
    setLoading(true); // Set loading state to true
    try {
      const searchResults = await searchMovies(searchQuery); // Fetch search results
      setMovies(searchResults);
      setError(null); // Clear any previous error messages
    } catch (err) {
      console.error(err); // Log the error to the console
      setError("Failed to search movies. Please try again later."); // Set error message if fetching fails
    } finally {
      setLoading(false); // Set loading state to false
    }


    setSearchQuery(""); // Clear the search input after submission
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

    {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
