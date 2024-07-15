import './adminPanel.css';
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {

    const generateUniqueId = () => {
        return `${Date.now()}`;
    };

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        director: '',
        description: '',
        photo: null
    });
    const [previewSrc, setPreviewSrc] = useState('');
    const [movies, setMovies] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (storedData) {
            setMovies(storedData.movies || []);
        }
    }, []);

    useEffect(() => {
        if (editId !== null) {
            const movie = movies.find(m => m.id === editId);
            if (movie) {
                setFormData({
                    title: movie.title,
                    genre: movie.genres.join(', '),
                    director: movie.directors.join(', '),
                    description: movie.description,
                    photo: null
                });
                setPreviewSrc(movie.photos[0] || '');
            }
        }
    }, [editId, movies]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            const file = files[0];
            setFormData({ ...formData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMovie = {
            title: formData.title,
            genres: formData.genre.split(',').map(item => item.trim()),
            directors: formData.director.split(',').map(item => item.trim()),
            description: formData.description,
            photos: [previewSrc],
            id: editId !== null ? editId : generateUniqueId() // Используйте уникальный ID
        };

        const storedData = JSON.parse(localStorage.getItem('data')) || { movies: [] };
        let updatedMovies = storedData.movies;

        if (editId !== null) {
            // Обновление существующего фильма по id
            updatedMovies = updatedMovies.map(movie => (movie.id === editId ? newMovie : movie));
        } else {
            // Добавление нового фильма
            updatedMovies = [...updatedMovies, newMovie];
        }

        localStorage.setItem('data', JSON.stringify({ movies: updatedMovies }));

        setMovies(updatedMovies);
        setFormData({
            title: '',
            genre: '',
            director: '',
            description: '',
            photo: null
        });
        setPreviewSrc('');
        setEditId(null);
    };

    const handleEdit = (id) => {
        setEditId(id);
    };

    const handleDelete = (id) => {
        const updatedMovies = movies.filter(movie => movie.id !== id);
        localStorage.setItem('data', JSON.stringify({ movies: updatedMovies }));
        setMovies(updatedMovies);
        if (editId === id) {
            setFormData({
                title: '',
                genre: '',
                director: '',
                description: '',
                photo: null
            });
            setPreviewSrc('');
            setEditId(null);
        }
    };

    return (
        <div className='admin-panel'>
            <div className='admin-panel__info'>
                <div className='admin-panel__content'>
                    <p className='admin-panel__content__text'>Управление фильмами</p>
                    <p className='admin-panel__content__text'>{editId !== null ? 'Редактировать фильм:' : 'Добавить новый:'}</p>
                </div>
            </div>
            <form className='admin-panel__form-container' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='left'>
                        <div className='form-group'>
                            <label htmlFor='title' className='form-title'>Название:</label>
                            <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genre' className='form-title'>Жанр:</label>
                            <input type='text' id='genre' name='genre' value={formData.genre} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='director' className='form-title'>Режиссер:</label>
                            <input type='text' id='director' name='director' value={formData.director} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='form-group'>
                            <img id='photo-preview' src={previewSrc} alt='' />
                            <label htmlFor='photo'>Загрузить постер</label>
                            <input type='file' id='photo' name='photo' accept='image/*' onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='description' className='form-title'>Описание:</label>
                    <textarea id='description' name='description' className='description' value={formData.description} onChange={handleChange}></textarea>
                </div>
                <button type='submit' className='form-button'>{editId !== null ? 'Сохранить' : 'Добавить'}</button>
            </form>
            <div className='admin-panel__database'>
                <p className='admin-panel__database__text'>База данных:</p>
                <table>
                    <thead>
                    <tr>
                        <th>Название:</th>
                        <th>Жанр:</th>
                        <th>Режиссер:</th>
                        <th>Описание:</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.genres.join(', ')}</td>
                            <td>{movie.directors.join(', ')}</td>
                            <td>{movie.description}</td>
                            <td onClick={() => handleDelete(movie.id)}>❌</td>
                            <td onClick={() => handleEdit(movie.id)}>🖋</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
