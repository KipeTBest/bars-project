import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./movieCard.css";
import backgroundImg from "./background.jpg";
import Heart from "./../Profile/img/heart.svg";
import HeartNotLike from "./../Profile/img/heart-outline.svg";
import MovieReviews from './MovieReviews';

const MovieCard = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataFromStorage = localStorage.getItem('data');
                if (!dataFromStorage) {
                    throw new Error('Данные о фильмах не найдены в localStorage');
                }

                const parsedData = JSON.parse(dataFromStorage);
                const movieId = parseInt(id);
                const selectedMovie = parsedData.movies[movieId];

                if (!selectedMovie) {
                    throw new Error(`Фильм с индексом ${id} не найден`);
                }

                setMovie(selectedMovie);

                const reviewsFromStorage = localStorage.getItem('reviews');
                const parsedReviews = reviewsFromStorage ? JSON.parse(reviewsFromStorage) : { reviews: [] };
                const selectedReviews = parsedReviews.reviews.filter(review => review.movieId === movieId);
                setReviews(selectedReviews);

                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    setIsAuthenticated(parsedUserData.auth);
                    setIsFavorite(parsedUserData.favoriteMovies.includes(movieId));
                }

                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddReview = (newReview) => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (!userData) {
                throw new Error('Пользователь не найден в localStorage');
            }

            newReview.userInfo = [userData.lastName, userData.firstName, userData.photo];
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);

            const reviewsFromStorage = localStorage.getItem('reviews');
            const parsedReviews = reviewsFromStorage ? JSON.parse(reviewsFromStorage) : { reviews: [] };
            newReview.movieId = parseInt(id);
            parsedReviews.reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(parsedReviews));

            console.log("Добавлен новый отзыв: ", newReview);

        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleFavorite = () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (!userData) {
                throw new Error('Пользователь не найден в localStorage');
            }

            let updatedFavoriteMovies;
            if (isFavorite) {
                updatedFavoriteMovies = userData.favoriteMovies.filter(favIndex => favIndex !== parseInt(id));
            } else {
                updatedFavoriteMovies = [...userData.favoriteMovies, parseInt(id)];
            }

            userData.favoriteMovies = updatedFavoriteMovies;
            localStorage.setItem('user', JSON.stringify(userData));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error.message);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!movie) {
        return <div>Фильм не найден</div>;
    }

    return (
        <div className="movie">
            <div className="movie-details">
                <h1>{movie.title}</h1>
                <h4>Режиссер: {movie.directors.join(', ')}, жанр: {movie.genres.join(', ')}</h4>
                <div className="movie-container">
                    <img src={movie.photos[0]} alt={movie.title}/>
                    <div className="movie-container__text">
                        <h3>{movie.description}</h3>
                        <div className="favorite-button">
                            <button onClick={toggleFavorite}>
                                {isFavorite ? <img src={Heart} alt="Remove from favorites"/> :
                                    <img src={HeartNotLike} alt="Add to favorites"/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MovieReviews
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                movieId={id}
                onAddReview={handleAddReview}
            />

            <div className="background-img">
                <img src={backgroundImg} alt="Background"/>
            </div>
        </div>
    );
};

export default MovieCard;
