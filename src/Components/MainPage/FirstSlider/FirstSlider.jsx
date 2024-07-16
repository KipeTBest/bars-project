import { useState } from 'react';
import './FirstSlider.css';

function Slider({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesToShow = 5; 
    const totalSlides = data.length;

    const goToPrevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? totalSlides - slidesToShow : currentIndex - 1);
    };

    const goToNextSlide = () => {
        setCurrentIndex(currentIndex === totalSlides - slidesToShow ? 0 : currentIndex + 1);
    };

    return (
        <div className="Slider-container" >
            <div className="Slider">
                <div className="slides-container" style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}>
                    
                    {data.map((el, index) => (
                        
                        <div key={index} className="slide" 
                        style={{backgroundImage : `url(${el.photos[0]})`}}>
                            <a href={`/movies/${el.id}`}>
                                <div className="overlay"></div>
                            </a>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={goToPrevSlide}>❮</button>
                <button className="next" onClick={goToNextSlide}>❯</button>
            </div>
        </div>
    );
}

export default Slider;