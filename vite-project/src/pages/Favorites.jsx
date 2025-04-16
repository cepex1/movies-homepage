import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard"; // Asegúrate de que la ruta sea correcta

function Favorites() { // This component displays the favorite movies
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      <h2>Favorite Movies</h2>
      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Start adding movies to your favourites and they will appear here!</p>
      )}
    </div>
  );
}

export default Favorites;
