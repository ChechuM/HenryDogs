import './Boceto.css';
import defaultIcon from '../Form/defaultIcon';
import dog from '../Create/dog.png';



export default function Boceto(props) {

    const { input, errors, handleSubmit } = props;

    return (
        <div className="bocetoDiv">
            {
                input.image
                    ? <img className='imgBoceto' src={input.image} alt="dog" />
                    : <img className='imgBoceto' src={defaultIcon} alt="default icon" />
            }
            <div className="textBoceto">
                <h3 className='nameBoceto'>{input.name}</h3>
                {
                    errors.name && <p className="warning">{errors.name}</p>
                }
                <p className='tempBoceto'> <span className="title">Temperaments:</span> {
                    input.temperaments && input.temperaments.join(' ')} </p>
                {
                    errors.temperaments && <p className="warning">{errors.temperaments}</p>
                }
                <p className='weightBoceto'> <span className="title">Weight:</span> {input.minWeight} - {input.maxWeight} kg.</p>
                {
                    errors.minWeight && <p className="warning">{errors.minWeight}</p>
                }
                <p className='heightBoceto'><span className="title">Height:</span> {input.minHeight} - {input.maxHeight} cm.</p>
                {
                    errors.minHeight && <p className="warning">{errors.minHeight}</p>
                }
                <p className='spanBoceto'><span className="title">Life Span:</span> {input.span} years</p>
                {
                    errors.span && <p className="warning">{errors.span}</p>
                }
            </div>

            <button className='newDog' onClick={handleSubmit}> <img src={dog} alt="dog" className="dogCreate" /> <span className="hide">  Create New Dog! </span>  </button>
        </div>
    )
}