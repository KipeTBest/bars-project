import "./styles/favoriteMovies.css"
import HeaderProfile from "./HeaderProfile";
import React, { useState, useEffect } from 'react';
import MovieContainer from "./MovieContainer";


const FavoriteMovies = () => {

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || { favoriteMovies: [] };
    const moviesData = JSON.parse(localStorage.getItem('data')) || { movies: [] };

    setAllMovies(moviesData.movies);

    const favorites = user.favoriteMovies.map(index => ({ ...moviesData.movies[index], id: index }));
    setFavoriteMovies(favorites);
  }, []);

  // Функция для удаления фильма из избранного
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);

    const user = JSON.parse(localStorage.getItem('user')) || { favoriteMovies: [] };
    user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Разбиение фильмов на страницы по 12 фильмов на странице (4x3)
  const moviesPerPage = 12;
  const numPages = Math.ceil(favoriteMovies.length / moviesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favoriteMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Переключение страниц
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return(
      <div className="favorite-movies__container">
        <HeaderProfile/>
        {favoriteMovies.length === 0 ? (
            <p>Вы еще не добавили ни один фильм в избранное</p>
        ) : (
            <>
              <div className="movies-grid">
                {currentMovies.map(movie => (
                    <MovieContainer key={movie.id} movie={movie} removeFromFavorites={removeFromFavorites} />
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: numPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
              </div>
            </>
        )}
      </div>
  )
}
export default FavoriteMovies