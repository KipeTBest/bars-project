import { Link } from "react-router-dom";
import "./Button.css"

function Button({style, data}) {
    return (
      <div className="Button" style={{maxWidth: `${style}%`}}>
         <Link to='/filterMovies'>{data}</Link>
      </div>
    );
  }
  
  export default Button;
  