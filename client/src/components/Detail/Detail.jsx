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
import defaultIcon from '../Form/defaultIcon';
import { setLoading } from '../../redux/actions';
import loadingDog from '../../img/loadingDog.gif';

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
        setLoading(true)
        fetch(`http://localhost:3001/dogs/${idBreed}`)
            .then((response) => response.json())
            .then((dog) => {
                if (!dog.image) dog.image = defaultIcon;
                setDog({
                    id: dog.id,
                    name: dog.name,
                    image: dog.image,
                    temperament: dog.temperament,
                    span: dog.span,
                    height: dog.height,
                    weight: dog.weight
                })
                setLoading(false)
            })

    }, [idBreed])

    return (
        <div className="total">
            {
                (dog.image) ? <div>
                    <h1 className='detailName'>{dog.name}</h1>
                    <img src={dog.image} alt='dog' className='detailImage' />
                    <div className="info">
                        <p className='dogTemp'><span className='title'>Temperament: </span>{dog.temperament}</p>
                        <div className="WHdiv">
                            <p className='weight'> <span className="title">Weight:  </span>{dog.weight}</p>
                            <p className='height'> <span className="title">Height:  </span>{dog.height}</p>
                        </div>
                        <p className='span'><span className="title">Life Span:  </span>  {dog.span}</p>
                        <p className='idDetail'><span className="title">id:  </span>  {dog.id}</p>
                    </div>
                </div>
                    : <img src={loadingDog} alt='Loading resources' />
            }

        </div>
    )
};