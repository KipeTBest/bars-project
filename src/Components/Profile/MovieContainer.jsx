import React from 'react';
import Like from "./../Header/img/Like.svg"

const MovieContainer = ({ movie, removeFromFavorites }) => {

    const handleCardClick = () => {
        //TODO: какая логика расположения страниц фильмов?
        window.location.href = `/movies/${movie.id}`;
    };

    return (
        <div className="movie-card" onClick={handleCardClick}>
            <img src={movie.photos[0]} alt={movie.title}/>
            <button onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(movie.id);
            }}><img src={Like} alt="Delete" />
            </button>
            <span className="movie-info"> {movie.title}</span>
        </div>
    );
}

export default MovieContainer;