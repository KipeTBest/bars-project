import './Header.css'
import Like from "./img/Like.svg"
import User from './img/User.svg'
import Search from './img/Search.svg'
import { Link } from 'react-router-dom';
function Header() {
    return (
      <div className="Header">
        <Link to="/"><span>NewC</span></Link>
        <div className="HeaderImg">
            <Link to="/favorite"><img src={Like}/></Link>
            <Link to="/profile"><img src={User}/></Link>
            <Link to="/filterMovies"><img src={Search}/></Link>
        </div>
      </div>
    );
  }
  
  export default Header;
  
