import Header from "../Header/Header";
import "./MainPage.css"
import Comedia from "./Comedia/Comedia";
import Parallelogram from "./Parallelogram/Parallelogram";
import FirstSlider from "./FirstSlider/FirstSlider";
import YourName from "./YourName/YourName";
import Romantic from "./Romantic/Romantic";
import Horrors from "./Horrors/Horrors";

function MainPage() {

    const data = JSON.parse(localStorage.getItem('data'))
    const newsMovies = data.movies.splice(data.movies.length - 10, data.movies.length)
    const comedia = data.movies.filter(el => el.genres.includes("комедия"));
    const romantic = data.movies.filter(el => el.genres.includes("романтика"));
    const horrors = data.movies.filter(el => el.genres.includes("ужасы"));
    
    return (
      <div className="MainPage">
        <div className="headerYourName">
            <YourName/>
            <FirstSlider data={newsMovies}/>
            <Parallelogram/>
        </div>
        <Comedia data={comedia}/>
        <Romantic data={romantic}/>
        <Horrors data={horrors}/>
      </div>
    );
  }
  
  export default MainPage;
  