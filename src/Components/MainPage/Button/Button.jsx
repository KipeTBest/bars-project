import "./Button.css"

function Button({style, data}) {
    return (
      <div className="Button" style={{maxWidth: `${style}%`}}>
         <a>{data}</a>
      </div>
    );
  }
  
  export default Button;
  