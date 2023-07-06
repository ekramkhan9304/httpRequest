import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  // // normal fetch api 

  // const fetchMovieHandler = () => {
  //   fetch('https://swapi.dev/api/films')
  //     .then((response) => {
  //       return response.json();
  //     }).then((data) => {
  //       const transformedMovies = data.results.map((moviesData) => {
  //         return {
  //           id: moviesData.episode_id,
  //           title: moviesData.title,
  //           openingText: moviesData.opening_crawl,
  //           releaseDate: moviesData.release_date,
  //         }
  //       })
  //       setMovies(transformedMovies)
  //     })
  // }

  //  async await fetch api

  useEffect(() => {
    fetchMovieHandler();
  }, [])

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {

      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('something went wrong!')
      }
      const data = await response.json()

      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        }
      })
      setMovies(transformedMovies);
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false);

  }

  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found No movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}

        {content}

      </section>
    </React.Fragment>
  );
}

export default App;
