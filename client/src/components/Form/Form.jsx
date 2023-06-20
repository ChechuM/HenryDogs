import './Form.css';
import { React } from 'react';
import { useSelector } from 'react-redux';
// import * as actions from '../../redux/actions';

// export function validate(temperament) {
//     let errors = {};
//     if (temperament.length === 0) errors.temperament = 'Please pick at least one temperament from the list';
//     return errors;
// }

export default function Form(props) {
    // const dispatch = useDispatch();

    const temperaments = useSelector(store => store.temperaments)

    const { input, handleInputChange, handleSubmit, setInput } = props;

    const handleTemps = (event) => {
        let { value, checked } = event.target;
        if (checked) {
            setInput(current => ({
                ...current,
                temperaments: [...current.temperaments, value]
            }))
        }
        if (!checked) {
            setInput({
                ...input,
                temperaments: input.temperaments.filter((temp) => temp !== value)
            })
        }
        // setErrors(
        //     validate({
        //         ...input,
        //         temperaments: value
        //     })
        // )
    }

    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit}>
                <label className='labelForm'>Name: </label>
                <input
                    className='inputGral'
                    name='name'
                    type="text"
                    placeholder='Name of the dog breed...'
                    onChange={handleInputChange}
                    value={input.name} />
                <span>  </span>

                <label className='labelForm'> Image: </label>
                <input
                    className='inputGral'
                    name='image'
                    placeholder='Copy the url of a cool image of the dog...'
                    type='text'
                    onChange={handleInputChange}
                    value={input.image} />

                <label className='labelForm'> Life span: </label>
                <input
                    className='inputGral'
                    name='span'
                    type="text"
                    placeholder='How many years do this breed live...'
                    onChange={handleInputChange}
                    value={input.span} />
                <label className='labelForm'> years </label>
                <hr />
                <label className='labelForm'> Height: </label>
                <input
                    className='inputNumber'
                    name='minHeight'
                    type="number"
                    placeholder='Min height'
                    onChange={handleInputChange}
                    value={input.minHeight} />
                <label> - </label>
                <input
                    className='inputNumber'
                    name='maxHeight'
                    type="number"
                    placeholder='Max height'
                    onChange={handleInputChange}
                    value={input.maxHeight} />
                <label className='labelForm'> cm.  </label>
                <span> </span>
                <label className='labelForm'>  Weight: </label>
                <input
                    className='inputNumber'
                    name='minWeight'
                    type="number"
                    placeholder='Min weight'
                    onChange={handleInputChange}
                    value={input.minWeight} />
                <label> - </label>
                <input
                    className='inputNumber'
                    name='maxWeight'
                    type="number"
                    placeholder='Max weight'
                    onChange={handleInputChange}
                    value={input.maxWeight} />
                <label className='labelForm'> kg. </label>
                <hr />
                <label className='labelForm'> Temperament: </label>
                <div className="tempDiv">
                    {
                        temperaments.map((temp) => {
                            return <p>{temp} <input className='tempCheck'
                                name='temps'
                                id={temp}
                                type='checkbox'
                                onChange={handleTemps}
                                value={temp} /></p>
                        })
                    }
                </div>

                <hr />
                <button className='newDog' onClick={handleSubmit}>Create New Dog!</button>

            </form>
        </div>
    )
}