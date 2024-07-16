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
            <div className="footer__about">
                <Link to="/" onClick={scrollToTop}><span>NewC</span></Link>
                <p className="footer-about-p">NewC — ваша новая киноплатформа.</p>
            </div>

            <div className="footer__contact">
                <ul>
                    <li>Контактная информация</li>
                    <li>Email: newCinema@gmail.com</li>
                    <li>Адрес: улица Пушкина, дом Калатушкина</li>
                </ul>
            </div>

            <div className="footer__pages">
                <ul>
                    <li><Link to="/profile" onClick={scrollToTop}><span>Личный кабинет</span></Link></li>
                    <li><Link to="/favorite" onClick={scrollToTop}><span>Избранные фильмы</span></Link></li>
                    <li><Link to="/" onClick={scrollToTop}><span>Поиск</span></Link></li>
                </ul>
            </div>


        </div>
    )
}

export default Footer