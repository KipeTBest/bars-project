import React, { useEffect } from 'react'; // eslint-disable-line

const LoadJson = () => {
    useEffect(() => {
        const loadJsonToLocalStorage = async () => {
            try {
                const responseData = await fetch('/movies.json');
                const data = await responseData.json();
                localStorage.setItem('data', JSON.stringify(data));

                const responseUser = await fetch('/user.json');
                const user = await responseUser.json();
                localStorage.setItem('user', JSON.stringify(user));

                console.log('Данные фильмов загружены:', data);
                console.log('Данные пользователя загружены:', user);
            } catch (error) {
                console.error('Ошибка загрузка данных', error);
            }
        };

        loadJsonToLocalStorage();
    }, []);

    return null;
};

export default LoadJson;