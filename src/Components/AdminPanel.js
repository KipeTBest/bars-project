import './adminPanel.css';
import React from 'react';

const AdminPanel = () => {
    return (
        <div className='admin-panel'>
            <div className='test'>Placeholder to make it look like the mockup. Will tweak a bit when the header appears</div>
            <div className='admin-panel__info'>
                <div className='admin-panel__content'>
                    <p className='admin-panel__content__text'>Управление фильмами</p>
                    <p className='admin-panel__content__text'>Добавить новый:</p>
                </div>
            </div>
            <div className='admin-panel__form-container'>
                <form action='#' method='POST'>
                    <div className="form-group">
                        <label htmlFor="title" className='form-title'>Название:</label>
                        <input type="text" id="title" name="title" className='input'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre" className='form-title'>Жанр:</label>
                        <input type="text" id="genre" name="genre" className='input'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="director" className='form-title'>Режиссер:</label>
                        <input type="text" id="director" name="director" className='input'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className='form-title'>Описание:</label>
                        <textarea id="description" name="description" className='last-input'></textarea>
                    </div>
                    <button type="submit" className='form-button'>Добавить</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;