import React, { useState } from 'react';


const MovieReviews = ({ reviews, isAuthenticated, movieId, onAddReview }) => {
    const [newReviewText, setNewReviewText] = useState('');

    const handleReviewChange = (e) => {
        setNewReviewText(e.target.value);
    };

    const handleAddReview = () => {
        if (newReviewText.trim() === '') {
            return;
        }

        const newReview = {
            movieId: parseInt(movieId),
            reviewText: newReviewText
        };

        onAddReview(newReview);
        setNewReviewText('');
    };

    return (
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
    );
};

export default MovieReviews;
