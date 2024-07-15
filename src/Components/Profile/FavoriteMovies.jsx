import "./styles/favoriteMovies.css"
import HeaderProfile from "./HeaderProfile";
import React, { useState, useEffect } from 'react';
import MovieContainer from "./MovieContainer";
import { useNavigate } from "react-router-dom";

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user')) || { favoriteMovies: [] };
    const moviesData = JSON.parse(localStorage.getItem('data')) || { movies: [] };

    setAllMovies(moviesData.movies);

    const favorites = user.favoriteMovies.map(movieId => {
      const foundMovie = moviesData.movies.find(movie => movie.id === movieId);
      return foundMovie ? { ...foundMovie, id: movieId } : null;
    }).filter(movie => movie !== null);

    setFavoriteMovies(favorites);
    setLoading(false);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || !storedUser.auth) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate]);

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);

    const user = JSON.parse(localStorage.getItem('user')) || { favoriteMovies: [] };
    user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const moviesPerPage = 12;
  const numPages = Math.ceil(favoriteMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favoriteMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="favorite-movies__container">
        <HeaderProfile />
        {loading ? (
            <p>Загрузка...</p>
        ) : (
            favoriteMovies.length === 0 ? (
                <p>Вы еще не добавили ни один фильм в избранное</p>
            ) : (
                <>
                  <div className="movies-grid">
                    {currentMovies.map(movie => (
                        <MovieContainer key={movie.id} movie={movie} removeFromFavorites={() => removeFromFavorites(movie.id)} />
                    ))}
                  </div>
                  <div className="pagination">
                    {Array.from({ length: numPages }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
                    ))}
                  </div>
                </>
            )
        )}
      </div>
  );
};

export default FavoriteMovies;
