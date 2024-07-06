import "./FilterMovies.css"
import { useState } from "react";

const FilterMovies = () => {
    const [selectedOption, setSelectedOption] = useState(null);


    const [genres, setGenres] = useState("")
    const [directors, setDirectors] = useState("")
    const [title, setTitle] = useState("")
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
        } else {
            setSelectedOption(option);
            setGenres(String(option).trim().toLocaleLowerCase());
        }
        setIsOpen(false); 
    };
    


    const [threePoints, setThreePoints] = useState(false);
    const [numberingOfFilms, setnumberingOfFilms] = useState(0);
    const [pageNumber, setPageNumber] = useState(2);

    const [isOpen, setIsOpen] = useState(false); 
    const options = ['Комедия', 'Ужасы', 'Романтика', 'Драма', 'Боевик', 'Фантастика', "Отмена"];

    const data = JSON.parse(localStorage.getItem('data'))
    const chunkSize = 8;
    const allMovies = [];
    const movieSearchArr = [];
    for (let i = 0; i < data.movies.length; i += chunkSize) {
        allMovies.push(data.movies.slice(i, i + chunkSize));
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };

// // ['Байрон Хаскин']
// // ['приключения', 'комедия', 'семейный']
// // "Остров сокровищ"
    const movieSearch = (e) => {
        e.
        console.log(title);
        console.log(directors);
        console.log(genres);
        movieSearchArr.splice(0, movieSearchArr.length);
        allMovies.map(el => {
            el.map(element => {
                if(String(element.title).trim().toLowerCase() === title.trim().toLocaleLowerCase() &&
                    element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLocaleLowerCase()) &&
                    element.genres.includes(genres)){
                        movieSearchArr.splice(0, movieSearchArr.length);
                        return movieSearchArr.push(element)
                    }
                else if(String(element.title).trim().toLowerCase() === title.trim().toLocaleLowerCase() &&
                        element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLocaleLowerCase()) &&
                        genres === ""){
                            console.log(2)
                            movieSearchArr.push(element)
                    } 
                else if( element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLocaleLowerCase()) &&
                        element.genres.includes(genres) &&
                        title === "") {
                        console.log(3)
                        movieSearchArr.push(element)
                } else if( String(element.title).trim().toLowerCase() === title.trim().toLocaleLowerCase()  &&
                        element.genres.includes(genres) &&
                        directors === "") {
                        console.log(3)
                        movieSearchArr.push(element)
                }else if(element.genres.includes(genres) && 
                        directors === "" && 
                        title === "") {
                            console.log(4)
                            movieSearchArr.push(element);
                } else if(element.directors.map(item => item.toLowerCase()).includes(directors.trim().toLocaleLowerCase()) &&
                         genres === "" &&
                         title === "") {
                            console.log(5)
                            movieSearchArr.push(element);
                } else if(String(element.title).trim().toLowerCase() === title.trim().toLocaleLowerCase() &&
                    directors === "" && 
                    genres === ""){
                        console.log(6)
                        movieSearchArr.push(element);
                }
            })
        })
        setDirectors("");
        setTitle("");
        setSelectedOption("Выберите жанр");
        setGenres("")
        console.log(movieSearchArr)
    }






    const handlenumberingOfFilms = (e) => {
        setnumberingOfFilms(e.target.innerHTML - 1)
    }
    const handleThreePoints = () => {
        if(threePoints){
            setPageNumber(2)
        } else {
            setPageNumber(allMovies.length - 1)   
        }
        setThreePoints(!threePoints);
    }
    const changePageNumber = (e) => {
        if(threePoints === false) {
            if(pageNumber == allMovies.length - 1) {
                setPageNumber(pageNumber)
                setnumberingOfFilms(Number(allMovies.length) - 2)
                console.log(allMovies.length)
            } else {
                setPageNumber(pageNumber + 1)
                setnumberingOfFilms(e.target.innerHTML)
            }
        } else {
            if(pageNumber - 1 == allMovies.length - (allMovies.length - 1)) {
                setPageNumber(pageNumber)
                setnumberingOfFilms(Number(allMovies.length) - 2)
                console.log(allMovies.length)
            } else {
                setPageNumber(pageNumber - 1)
                setnumberingOfFilms(e.target.innerHTML)
            }
        }
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
                    <h1 className="movies-container-title">{}Показаны результаты по запросу: Оо Австралия, Райан Гослинг, Ужасы</h1>
                    <div className="info-movies-container">
                        {allMovies[numberingOfFilms].map((el, i) => (
                            <div key={i} className="movie"
                                style={{backgroundImage : `url(${el.photos[0]})`}}>
                                <a href='#'>
                                    <div class="overlay-movie"></div> 
                                </a>
                                <span className='title-movie'>{el.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>          




            <div className="cells-for-movies">
                {!threePoints && (
                    <>
                    <span className="cell" onClick={handlenumberingOfFilms}>1</span>
                    <span className="cell" onClick={changePageNumber}>{pageNumber}</span>
                    <span className="cell" onClick={handleThreePoints}>...</span>
                    <span className="cell" onClick={handlenumberingOfFilms}>{allMovies.length}</span>
                    </>
                )}
                {threePoints && (
                    <>
                    <span className="cell" onClick={handlenumberingOfFilms}>1</span>
                    <span className="cell" onClick={handleThreePoints}>...</span>
                    <span className="cell" onClick={changePageNumber}>{pageNumber}</span>
                    <span className="cell" onClick={handlenumberingOfFilms}>{allMovies.length}</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default FilterMovies;