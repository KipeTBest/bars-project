import React, { useEffect } from 'react';

const LoadJson = () => {
    useEffect(() => {
        const loadJsonToLocalStorage = async () => {
            try {
                // Проверяем, есть ли данные в localStorage, чтобы не заливать их повторно
                const existingData = localStorage.getItem('data');
                const existingUser = localStorage.getItem('user');

                if (!existingData || !existingUser) {
                    const responseData = await fetch('/movies.json');
                    const data = await responseData.json();
                    localStorage.setItem('data', JSON.stringify(data));

                    const responseUser = await fetch('/user.json');
                    const user = await responseUser.json();
                    localStorage.setItem('user', JSON.stringify(user));

                    const responseReviews = await fetch('/reviews.json');
                    const dataReviews = await responseReviews.json();
                    localStorage.setItem('reviews', JSON.stringify(dataReviews));

                    console.log('Данные фильмов загружены:', data);
                    console.log('Данные пользователя загружены:', user);
                    console.log('Данные отзывов загружены:', dataReviews);
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
