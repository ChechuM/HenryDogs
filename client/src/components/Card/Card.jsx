import './Card.css';
import { NavLink } from 'react-router-dom'

export default function Card({ id, name, image, temperament, weight }) {
    return (
        <div className="upperDiv">
            <NavLink to={`/dogs/${id}`} className='nameDog'>{name}</NavLink>
            <div className="imgCard">
                <img src={image} alt="This is a Dog" className="image" />
                <div className="divTW">
                    <div className="divWeight"> <span className='block'>Weight: </span> {weight}</div>
                    <div className="divTemps"><span className='block'>Temperament:  </span>{temperament}</div>
                </div>
            </div>
        </div>
    )
}

