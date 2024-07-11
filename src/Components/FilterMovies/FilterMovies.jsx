import "./FilterMovies.css"
import { useState } from "react";

const FilterMovies = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchVerification, setSearchVerification] = useState(true);

    const [genres, setGenres] = useState("")
    const [directors, setDirectors] = useState("")
    const [title, setTitle] = useState("")
    const [movieSearchArr, setMovieSearchArr] = useState([]);
    const [titleSearchMovies, setTitleSearchMovies] = useState(null)
    
    


    const [threePoints, setThreePoints] = useState(0);
    const [numberingOfFilms, setnumberingOfFilms] = useState(0);
    const [pageNumberFirst, setPageNumberFirst] = useState(2);
    const [pageNumberSecond, setPageNumberSecond] = useState(3);
    const [pageNumberThird, setPageNumberThird] = useState(4);

    const [isOpen, setIsOpen] = useState(false); 
    const options = ['Комедия', 'Ужасы', 'Романтика', 'Драма', 'Боевик', 'Фантастика', "Анимация", "Триллер", "Криминал" ,"Отмена", ];

    const data = JSON.parse(localStorage.getItem('data'))
    const chunkSize = 8;
    const allMovies = [];
    for (let i = 0; i < data.movies.length; i += chunkSize) {
        allMovies.push(data.movies.slice(i, i + chunkSize));
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };


    const handleTitleChange = (event) => {
        setTitle(event.target.value) 
    };

    const handleDirectorsChange = (event) => {
        setDirectors(event.target.value);
    };

    const handleSelect = (option) => {
        if(option === "Отмена") {
            setSelectedOption("Выберите жанр");
            setGenres("");
            setnumberingOfFilms(0);
        } else {
            setSelectedOption(option);
            setGenres(String(option).trim().toLocaleLowerCase());
            setnumberingOfFilms(0);
        }
        setIsOpen(false); 
    };

    const movieSearch = (e) => {
        e.preventDefault();
        if(title === "" && directors === "" && genres === "") {
            return
        } else {
            const filteredMovies = [];
            const filteredMoviesSections = []
            allMovies.map(el => {
                el.map(element => {
                    if (String(element.title).trim().toLowerCase() === title.trim().toLowerCase() &&
                        element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLowerCase()) &&
                        element.genres.includes(genres)){
                            setTitleSearchMovies(`Показаны результаты по запросу: ${title}, ${directors}, ${genres}`)
                            filteredMovies.push(element);
                        }
                    else if (String(element.title).trim().toLowerCase() === title.trim().toLowerCase() &&
                            element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLowerCase()) &&
                            genres === ""){
                                setTitleSearchMovies(`Показаны результаты по запросу: ${title}, ${directors}`)
                                filteredMovies.push(element);
                        } 
                    else if (element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLowerCase()) &&
                            element.genres.includes(genres) &&
                            title === "") {
                                setTitleSearchMovies(`Показаны результаты по запросу: ${directors}, ${genres}`)
                                filteredMovies.push(element);
                        } else if (String(element.title).trim().toLowerCase() === title.trim().toLowerCase() &&
                                element.genres.includes(genres) &&
                                directors === "") {
                                    setTitleSearchMovies(`Показаны результаты по запросу: ${title}, ${genres}`)
                                    filteredMovies.push(element);
                        } else if (element.genres.includes(genres) && 
                                directors === "" && 
                                title === "") {
                                    setTitleSearchMovies(`Показаны результаты по запросу: ${genres}`)
                                    filteredMovies.push(element);
                        } else if (element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLowerCase()) &&
                                    genres === "" &&
                                    title === "") {
                                        setTitleSearchMovies(`Показаны результаты по запросу: ${directors}`)
                                        filteredMovies.push(element);
                        } else if (String(element.title).trim().toLowerCase() === title.trim().toLowerCase() &&
                                directors === "" && 
                                genres === ""){
                                    setTitleSearchMovies(`Показаны результаты по запросу: ${title}`)
                                    filteredMovies.push(element);
                        }
                })
            })
            for (let i = 0; i < filteredMovies.length; i += chunkSize) {
                filteredMoviesSections.push(filteredMovies.slice(i, i + chunkSize));
            }
            setMovieSearchArr(filteredMoviesSections);
            setSearchVerification(false);
            setDirectors("");
            setTitle("");
            setSelectedOption("Выберите жанр");
            setGenres("");
            console.log(filteredMovies);
        }
        
    }

    const handlenumberingOfFilms = (e) => {
        if(Number(e.target.textContent) === 1) {
            console.log(e.target.textContent)
            setPageNumberFirst(2)
            setPageNumberSecond(3)
            setPageNumberThird(4)
            setThreePoints(0);
            setnumberingOfFilms(e.target.innerHTML - 1)
            return
        } else if (Number(e.target.textContent) === allMovies.length) {
            console.log(e.target.textContent)
            setPageNumberFirst(allMovies.length - 3)
            setPageNumberSecond(allMovies.length - 2)
            setPageNumberThird(allMovies.length - 1)
            setThreePoints(2);
            setnumberingOfFilms(e.target.textContent - 1)
            return
        } else {
            setnumberingOfFilms(e.target.innerHTML - 1)
        }
    }
    const handlenumbering = (e) => {
        setnumberingOfFilms(e.target.textContent - 1)
    }
    const changePageNumberFirst = (e) => {
        e.preventDefault();
        if(Number(e.target.textContent) === 2) {
            handlenumberingOfFilms(e);
            return
        } else {
            setPageNumberFirst(pageNumberFirst - 1)
            setPageNumberSecond(pageNumberSecond - 1)
            setPageNumberThird(pageNumberThird - 1)
        }
        if(pageNumberFirst < 6) {
            setPageNumberFirst(2)
            setPageNumberSecond(3)
            setPageNumberThird(4)
            setThreePoints(0);
        } else if(pageNumberSecond > allMovies.length - 5) {
            setPageNumberFirst(pageNumberFirst - 2)
            setPageNumberSecond(pageNumberSecond - 2)
            setPageNumberThird(pageNumberThird - 2)
            setThreePoints(1);
        }
        handlenumberingOfFilms(e);
    }
    const changePageNumberSecond = (e) => {
        handlenumberingOfFilms(e);
    }
    const changePageNumberThird = (e) => {
        e.preventDefault();
        if(pageNumberThird === allMovies.length - 1) {
            handlenumberingOfFilms(e);
            return
        } else {
            setPageNumberFirst(pageNumberFirst + 1)
            setPageNumberSecond(pageNumberSecond + 1)
            setPageNumberThird(pageNumberThird + 1)
        }
        if(pageNumberThird > allMovies.length - 4) {
            setPageNumberFirst(pageNumberFirst + 2)
            setPageNumberSecond(pageNumberSecond + 2)
            setPageNumberThird(pageNumberThird + 2)
            setThreePoints(2);
        } else if(pageNumberThird >= 4) {
            console.log(pageNumberThird)
            setThreePoints(1);
        }
        handlenumberingOfFilms(e);
    }
    


    const deleteSearch = (e) => {
        e.preventDefault();
        setSearchVerification(true);
        setMovieSearchArr([]);
        setnumberingOfFilms(0)
    }
    return(
        <div className="filter-movies">
            <div style={{display: "flex"}}>
                <div className="data-for-filter">
                    <h1 className="data-for-filter-title">Поиск фильмов</h1>
                    <div className="data-for-filter-block">
                        <span className="filter-movies-title">Название</span>
                        <input type="text" className="input-filter-movies" value={title} onChange={handleTitleChange}></input>
                    </div>
                    
                    <div className="data-for-filter-block">
                        <span className="filter-movies-title">Режиссер</span>
                        <input type="text" className="input-filter-movies" value={directors} onChange={handleDirectorsChange}></input>
                    </div>
                    
                    <div>
                        <span className="filter-movies-title">Жанр</span>
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleDropdown}>
                                {selectedOption || 'Выбирите жанр'}
                                <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
                            </div>
                            {isOpen && (
                                <ul className="dropdown-list">
                                {options.map((option, index) => (
                                    <li key={index} onClick={() => handleSelect(option)}>
                                        {option}
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="movieSearch" onClick={movieSearch}>Поиск</div>
                </div>



                <div className="movies-container">
                    {!searchVerification && (
                        <div className="info-search">
                            <h1 className="movies-container-title">{titleSearchMovies}</h1>
                            <div className="delete-search" onClick={deleteSearch}>Отменить поиск</div>
                        </div>
                    )}
                    <div className="info-movies-container">
                        {searchVerification && allMovies[numberingOfFilms].map((el, i) => (
                            <div key={i} className="movie"
                                style={{backgroundImage : `url(${el.photos[0]})`}}>
                                <a href='#'>
                                    <div class="overlay-movie"></div> 
                                </a>
                                <span className='title-movie'>{el.title}</span>
                            </div>
                        ))}
                        {!searchVerification && movieSearchArr[numberingOfFilms].map((el, i) => (
                            
                            <div key={i} className="movie"
                                style={{backgroundImage : `url(${el.photos[0]})`}}>
                                <a href='#'>
                                    {console.log(movieSearchArr)}
                                    <div class="overlay-movie"></div> 
                                </a>
                                <span className='title-movie'>{el.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>          



            {searchVerification && (
                <div className="cells-for-movies">
                    {threePoints === 0 && (
                        <>
                            <span className="cell" onClick={handlenumberingOfFilms}>1</span>
                            <span className="cell" onClick={changePageNumberFirst}>{pageNumberFirst}</span>
                            <span className="cell" onClick={changePageNumberSecond}>{pageNumberSecond}</span>
                            <span className="cell" onClick={changePageNumberThird}>{pageNumberThird}</span>
                            <span className="cell">...</span>
                            <span className="cell" onClick={handlenumberingOfFilms}>{allMovies.length}</span>
                        </>
                    )}
                    {threePoints === 1 && (
                        <>
                            <span className="cell" onClick={handlenumberingOfFilms}>1</span>
                            <span className="cell">...</span>
                            <span className="cell" onClick={changePageNumberFirst}>{pageNumberFirst}</span>
                            <span className="cell" onClick={changePageNumberSecond}>{pageNumberSecond}</span>
                            <span className="cell" onClick={changePageNumberThird}>{pageNumberThird}</span>
                            <span className="cell">...</span>
                            <span className="cell" onClick={handlenumberingOfFilms}>{allMovies.length}</span>
                        </>
                    )}
                    {threePoints === 2 && (
                        <>
                            <span className="cell" onClick={handlenumberingOfFilms}>1</span>
                            <span className="cell">...</span>
                            <span className="cell" onClick={changePageNumberFirst}>{pageNumberFirst}</span>
                            <span className="cell" onClick={changePageNumberSecond}>{pageNumberSecond}</span>
                            <span className="cell" onClick={changePageNumberThird}>{pageNumberThird}</span>
                            <span className="cell" onClick={handlenumberingOfFilms}>{allMovies.length}</span>
                        </>
                    )}
                </div>
            )}
            {!searchVerification && (
                 <div className="cells-for-movies">
                    {movieSearchArr.map((el, i) => (
                        <span key={i} className="cell" onClick={handlenumbering}>{i+1}</span>
                    ))}
                 </div>
            )}
            
        </div>
    )
}

export default FilterMovies;