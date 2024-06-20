import './adminPanel.css';
import React, { useState } from 'react';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        director: '',
        description: '',
        photo: null,
    });
    const [previewSrc, setPreviewSrc] = useState('');

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
            photos: [previewSrc], // предполагаем, что одно фото
        };

        // Получение текущих данных из localStorage
        const storedData = JSON.parse(localStorage.getItem('data'));

        // Добавление нового фильма
        const updatedMovies = [...storedData.movies, newMovie];

        // Сохранение обновленных данных в localStorage
        localStorage.setItem('data', JSON.stringify({ movies: updatedMovies }));

        // Очистка формы
        setFormData({
            title: '',
            genre: '',
            director: '',
            description: '',
            photo: null,
        });
        setPreviewSrc('');
    };

    return (
        <div className='admin-panel'>
            <div className='test'>Placeholder to make it look like the mockup. Will tweak a bit when the header appears</div>
            <div className='admin-panel__info'>
                <div className='admin-panel__content'>
                    <p className='admin-panel__content__text'>Управление фильмами</p>
                    <p className='admin-panel__content__text'>Добавить новый:</p>
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
                            <img id='photo-preview' src={previewSrc} alt='Preview' />
                            <label htmlFor='photo'>Загрузить постер</label>
                            <input type='file' id='photo' name='photo' accept='image/*' onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='description' className='form-title'>Описание:</label>
                    <textarea id='description' name='description' className='last-input' value={formData.description} onChange={handleChange}></textarea>
                </div>
                <button type='submit' className='form-button'>Добавить</button>
            </form>
        </div>
    );
};

export default AdminPanel;