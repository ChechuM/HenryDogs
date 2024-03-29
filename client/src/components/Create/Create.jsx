// 📍 FORM PAGE |: en esta vista se encontrará el formulario para crear una nueva raza de perro.

// Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

// Nombre.
// Altura (diferenciar entre altura mínima y máxima de la raza).
// Peso (diferenciar entre peso mínimo y máximo de la raza).
// Años de vida.
// Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
// Botón para crear la nueva raza.
// [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la raza no pueda contener números, o que el peso/altura mínimo no pueda ser mayor al máximo.

import './Create.css';
import Form from '../Form/Form';
import Boceto from '../Boceto/Boceto';
import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import defaultIcon from '../Form/defaultIcon';


export function validate({ name, temperaments, minHeight, maxHeight, minWeight, maxWeight, span }, allDogs) {
    let errors = {};
    if (allDogs) {
        for (let i = 0; i < allDogs.length; i++) {
            let element = allDogs[i].name;
            if (name === element) errors.name = 'A dog with that name already exists'
        }
    }
    const specialChars = /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
    if (!name) errors.name = 'Please write the name of the dog';
    if (name.length > 20) errors.name = 'Name must have 20 characters max';
    if (specialChars.test(name)) errors.name = 'Name must be alphanumeric only';
    if (!temperaments) errors.temperaments = 'Please pick at least one temperament from the list';
    if (!span) errors.span = 'Please write life span of your dog';
    if (Number(minHeight) < 1) errors.minHeight = 'Minimum Height cannot be lower than one';
    if (Number(minWeight) < 1) errors.minWeight = 'Maximum Height cannot be lower than one';
    if (Number(minHeight) > Number(maxHeight)) errors.minHeight = 'Minimum Height cannot be higher than Maximum Height';
    if (Number(minWeight) > Number(maxWeight)) errors.minWeight = 'Minimum Weight cannot be higher than Maximum Weight';
    return errors;
}

export default function Create() {
    const dispatch = useDispatch();
    const allDogs = useSelector(store => store.allDogs)

    const [input, setInput] = useState({
        name: '',
        image: '',
        temperaments: '',
        span: '',
        maxHeight: '',
        minHeight: '',
        maxWeight: '',
        minWeight: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        temperaments: '',
        minHeight: '',
        minWeight: ''
    });

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setInput({
            ...input,
            [name]: value
        })
        setErrors(
            validate({
                ...input,
                [name]: value
            }, allDogs)
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input.image) {
            setInput({
                ...input,
                image: defaultIcon
            })
        }
        const errors = validate(input, allDogs);
        if (Object.values(errors).length === 0) {
            dispatch(actions.addDog(input))
            alert('New dog created!')
        }
        else {
            setErrors(errors);
            alert('The new dog has to fulfill certain parameters, please check that everything is ok')
        }
    };

    return (
        <div className="bothDiv">
            <Form handleInputChange={handleInputChange} input={input} setInput={setInput} errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} validate={validate} className='form' />
            <Boceto input={input} errors={errors} setInput={setInput} handleSubmit={handleSubmit} className='boceto' />
        </div>
    )

}