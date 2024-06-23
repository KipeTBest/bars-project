import Button from '../Button/Button'
import ForTheRestSliders from '../ForTheRestSliders/ForTheRestSliders'
import './Romantic.css'

function Romantic({data, styles}) {
    return(
        <div className="romantic">
            <div className='info-romantic'>
                <h1>Романтика</h1>
                <span>Для игривых вечеров</span>
                <div>
                    <Button data={"больше"} style={70}/>
                </div>
                
            </div>
            <ForTheRestSliders data={data}/>
        </div>
    )
}

export default Romantic
