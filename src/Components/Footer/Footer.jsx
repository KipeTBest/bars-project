import {Link} from "react-router-dom";
import "./footer.css"

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return(
        <div className="footer">
            <ul className="footer__about">
                <Link to="/" onClick={scrollToTop}><span>NewC</span></Link>
                <p className="footer-about-p">NewC — ваша новая киноплатформа.</p>
            </ul>

            <ul className="footer__contact">
                <li>Контактная информация</li>
                <li>Email: newCinema@gmail.com</li>
                <li>Адрес: улица Пушкина, дом Калатушкина</li>
            </ul>

            <ul className="footer__pages">
                <Link to="/profile" onClick={scrollToTop}><span>Личный кабинет</span></Link>
                <Link to="/favorite" onClick={scrollToTop}><span>Избранные фильмы</span></Link>
                <Link to="/" onClick={scrollToTop}><span>Поиск</span></Link>
            </ul>

            <ul className="footer__icons">

            </ul>

        </div>
    )
}

export default Footer