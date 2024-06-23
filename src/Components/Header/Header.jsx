import './Header.css'
import Like from "./img/Like.svg"
import User from './img/User.svg'
import Search from './img/Search.svg'
function Header() {
    return (
      <div className="Header">
        <span>NewC</span>
        <div className="HeaderImg">
            <img src={Like}/>
            <img src={Search}/>
            <img src={User}/>
        </div>
      </div>
    );
  }
  
  export default Header;
  