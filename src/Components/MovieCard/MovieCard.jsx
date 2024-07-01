import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import "./movieCard.css";
import backgroundImg from "./background.jpg";
import Heart from "./../Profile/img/heart.svg";
import HeartNotLike from "./../Profile/img/heart-outline.svg";

//TODO: нужно переделать, но работает

const MovieCard = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
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
                const selectedMovie = parsedData.movies.find(movie => movie.id === parseInt(id));

                if (!selectedMovie) {
                    throw new Error(`Фильм с id ${id} не найден`);
                }

                setMovie(selectedMovie);

                const reviewsFromStorage = localStorage.getItem('reviews');
                const parsedReviews = reviewsFromStorage ? JSON.parse(reviewsFromStorage) : { reviews: [] };
                const selectedReviews = parsedReviews.reviews.filter(review => review.movieId === parseInt(id));
                setReviews(selectedReviews);

                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    setIsAuthenticated(parsedUserData.auth);
                    setIsFavorite(parsedUserData.favoriteMovies.includes(selectedMovie.id));
                }

                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleReviewChange = (e) => {
        setNewReviewText(e.target.value);
    };

    const handleAddReview = () => {
        if (newReviewText.trim() === '') {
            return;
        }

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (!userData) {
                throw new Error('Пользователь не найден в localStorage');
            }

            const newReview = {
                movieId: parseInt(id),
                userInfo: [userData.lastName, userData.firstName, userData.photo],
                reviewText: newReviewText
            };

            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);

            const reviewsFromStorage = localStorage.getItem('reviews');
            const parsedReviews = reviewsFromStorage ? JSON.parse(reviewsFromStorage) : { reviews: [] };
            parsedReviews.reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(parsedReviews));

            setNewReviewText('');
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
                updatedFavoriteMovies = userData.favoriteMovies.filter(favId => favId !== movie.id);
            } else {
                updatedFavoriteMovies = [...userData.favoriteMovies, movie.id];
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
                    <h3>{movie.description}</h3>
                    <div className="favorite-button">
                        <button onClick={toggleFavorite}>
                            {isFavorite ? <img src={Heart} alt="Remove from favorites"/> :
                                <img src={HeartNotLike} alt="Add to favorites"/>}
                        </button>
                    </div>
                </div>
            </div>

            <div className="movie-reviews">
                <h1> Обсуждения: </h1>

                {reviews.length > 0 ? reviews.map((review, index) => (
                    <div key={index} className="review-container">
                        <img src={review.userInfo[2]} alt={`${review.userInfo[0]} ${review.userInfo[1]}`}/>
                        <div className="review-container__data">
                            <h5>{`${review.userInfo[0]} ${review.userInfo[1]}`}</h5>
                            <p>{review.reviewText}</p>
                        </div>
                    </div>
                )) : <p className="user-not-review">Еще никто не написал комментарий, будь первым!</p>}

                {isAuthenticated && (
                    <div className="movie-reviews__add">
                        <textarea
                            value={newReviewText}
                            onChange={handleReviewChange}
                            placeholder="Написать комментарий"
                        />
                        <button onClick={handleAddReview}>Отправить</button>
                    </div>
                )}
            </div>

            <div className="background-img">
                <img src={backgroundImg} alt="Background"/>
            </div>
        </div>
    );
}

export default React.memo(MovieCard);
