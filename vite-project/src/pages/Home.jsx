import MovieCard from "../components/MovieCard";

function Home() {
  const movies = [
    { id: 1, title: "John Wick", release_date: "2023" },
    { id: 2, title: "Terminator", release_date: "1999" },
    { id: 3, title: "The Matrix", release_date: "1999" },
  ];

  const handleSearch = () => {};

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
        />
        <button type="submit" className="search-button">
          Search
          </button>
      </form>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
export default Home;
