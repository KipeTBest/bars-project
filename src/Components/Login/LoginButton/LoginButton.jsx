import "./LoginButton.css"

function LoginButton({style, data}) {
    return (
      <div className="LoginButton" style={{maxWidth: `${style}%`}}>
         <a>{data}</a>
      </div>
    );
  }
  
  export default LoginButton;
  