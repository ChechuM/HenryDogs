// 📍 DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un perro:

// ID.
// Imagen.
// Nombre.
// Altura.
// Peso.
// Temperamentos.
// Años de vida.

import './Detail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Detail() {
    const { idBreed } = useParams();

    const [dog, setDog] = useState({
        id: '',
        name: '',
        image: '',
        temperament: '',
        span: '',
        height: '',
        weight: ''
    });

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${idBreed}`)
            .then((response) => response.json())
            .then((dog) => {
                setDog({
                    id: dog.id,
                    name: dog.name,
                    image: dog.image,
                    temperament: dog.temperament,
                    span: dog.span,
                    height: dog.height,
                    weight: dog.weight
                })
            })
    }, [idBreed])

    return (
        <div className="total">
            <p className='idDetail'>id: {dog.id}</p>
            <h1 className='detailName'>{dog.name}</h1>
            <img src={dog.image} alt='dog' className='detailImage' />
            <p className='dogTemp'> Temperament: {dog.temperament}</p>
            <p className='span'>Life Span: {dog.span}</p>
            <p className='weight'> Weight: {dog.weight}</p>
            <p className='height'> Height: {dog.height}</p>
        </div>
    )
};