import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import MovieList from './components/MovieList';
import {apiKey} from './credentials/keys'
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [favourites, setFavourites] = useState([])

const GetMovies = (searchValue) => {
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&plot=short`

  fetch(url)
  .then(response => response.json())
  .then(data => {
      if (data.Search) {
        setMovies(data.Search)
      } else {
        return null
      }
    })
    .catch(error => console.error(error))
} 

  useEffect(() => {
    GetMovies(query);
  }, [query]); //called when the state updates 
  
  const addFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites, movie]
    setFavourites(newFavouritesList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouritesList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouritesList)
  }
  return (
    <div className="container-fluid movie-app" >
        <div className="row d-flex mt-4 mb-4">
            <MovieListHeading heading='Movies'/>
            <SearchBox query={query} setQuery={setQuery}/>
          <div className="movie-list row">  
            <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
          </div>
        </div>
        <div className="row d-flex mt-4 mb-4">
            <MovieListHeading heading='Favourites'/>
          <div className="movie-list row">  
            <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
          </div>
        </div>


    </div>
  );
}

export default App;
