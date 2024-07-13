import React, { useEffect } from 'react';

const LoadJson = () => {
    useEffect(() => {
        const loadJsonToLocalStorage = async () => {
            try {
                // Проверяем, есть ли данные в localStorage, чтобы не заливать их повторно
                const existingData = localStorage.getItem('data');
                const existingUser = localStorage.getItem('user');
                const existingUsers = localStorage.getItem('users');
                const existingReviews = localStorage.getItem('reviews');

                if (!existingData || !existingUser || !existingUsers || !existingReviews) {
                    const responseData = await fetch('/movies.json');
                    const data = await responseData.json();
                    localStorage.setItem('data', JSON.stringify(data));

                    const responseUser = await fetch('/user.json');
                    const user = await responseUser.json();
                    localStorage.setItem('user', JSON.stringify(user));

                    const responseUsers = await fetch('/users.json');
                    const users = await responseUsers.json();
                    localStorage.setItem('users', JSON.stringify(users));

                    const responseReviews = await fetch('/reviews.json');
                    const reviews = await responseReviews.json();
                    localStorage.setItem('reviews', JSON.stringify(reviews));

                    console.log('Данные фильмов загружены:', data);
                    console.log('Данные пользователя загружены:', user);
                    console.log('Данные отзывов загружены:', reviews);
                    console.log('Данные о пользователях загружены:', users);
                } else {
                    console.log('Данные уже загружены в localStorage.');
                }
            } catch (error) {
                console.error('Ошибка загрузки данных', error);
            }
        };
        loadJsonToLocalStorage();
    }, []);

    return null;
};

export default LoadJson;
