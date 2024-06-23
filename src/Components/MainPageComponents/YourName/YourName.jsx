import Button from "../Button/Button";
import "./YourName.css"

function YourName() {
    return (
    <div className="yourName">
        <span>Новинки:</span>
        <div className="yourNameInfo">
            <p>ТВОЕ ИМЯ</p>
            <Button data={"подоробнее"} style={20}/>
        </div>
    </div>
    );
  }
  
  export default YourName;
  