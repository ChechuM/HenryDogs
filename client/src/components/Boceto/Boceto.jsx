import './Boceto.css';
import defaultIcon from '../Form/defaultIcon';


export default function Boceto(props) {

    const { input } = props;

    return (
        <div className="bocetoDiv">
            {
                input.image
                    ? <img className='imgBoceto' src={input.image} alt="dog" />
                    : <img className='imgBoceto' src={defaultIcon} alt="default icon" />
            }
            <div className="textBoceto">
                <h3 className='nameBoceto'>{input.name}</h3>
                {/* {
                    errors.name && <p className="warning">{errors.name}</p>
                } */}
                <p className='tempBoceto'>Temperaments: {input.temperaments}</p>
                {/* {
                    errors.temperaments && <p className="warning">{errors.temperaments}</p>
                } */}
                <p className='weightBoceto'>Weight: {input.minWeight} - {input.maxWeight} kg.</p>
                {/* {
                    errors.minWeight && <p className="warning">{errors.minWeight}</p>
                } */}
                <p className='heightBoceto'>Height: {input.minHeight} - {input.maxHeight} cm.</p>
                {/* {
                    errors.minHeight && <p className="warning">{errors.minHeight}</p>
                } */}
                <p className='spanBoceto'>Life Span: {input.span} years</p>
            </div>
        </div>
    )
}