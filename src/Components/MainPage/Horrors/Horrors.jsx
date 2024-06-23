import Button from '../Button/Button'
import ForTheRestSliders from '../ForTheRestSliders/ForTheRestSliders'
import './Horrors.css'

function Horrors({data, styles}) {
    return(
        <div className="horrors">
            <ForTheRestSliders data={data}/>
            <div className='info'>
                <h1>Ужасы</h1>
                <span>Для игривых вечеров</span>
                <div>
                    <Button data={"больше"} style={88}/>
                </div>
                
            </div>
        </div>
    )
}

export default Horrors