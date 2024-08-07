import { useState } from 'react';
import './ForTheRestSliders.css';

function ForTheRestSliders({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesToShow = 4
    const totalSlides = 9;

    const goToPrevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? totalSlides - slidesToShow : currentIndex - 1);
    };

    const goToNextSlide = () => {
        setCurrentIndex(currentIndex === totalSlides - slidesToShow ? 0 : currentIndex + 1);
    };
    console.log(data);

    return (
        <div className="ForTheRestSliders">
            <div className="Slider">
                <div className="slides-container" style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}>
                    
                    {data.map((el, index) => (
                        <>
                            <div key={index} className="slides" 
                            style={{backgroundImage : `url(${el.photos[0]})`}}>
                                <a href={`/movies/${el.id}`}>
                                    <div className="overlay"></div>
                                </a>
                                <span className='title'>{el.title}</span>
                            </div>
                        </>
                        
                    ))}
                </div>
                <button className="prev" onClick={goToPrevSlide}>❮</button>
                <button className="next" onClick={goToNextSlide}>❯</button>
            </div>
        </div>
    );
}

export default ForTheRestSliders;