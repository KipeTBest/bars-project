import Button from '../Button/Button'
import ForTheRestSliders from '../ForTheRestSliders/ForTheRestSliders'
import './Comedia.css'

function Comedia({data, styles}) {
    return(
        <div className="comedia">
            <ForTheRestSliders data={data}/>
            <div className='info'>
                <h1>Комедии</h1>
                <span>Для игривых вечеров</span>
                <div>
                    <Button data={"больше"} style={88}/>
                </div>
                
            </div>
        </div>
    )
}

export default Comedia