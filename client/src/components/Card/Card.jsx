import './Card.css';
import { NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Card({ id, name, image, temperament, weight }) {
    const navigate = useNavigate();

    return (
        <div className="upperDiv">
            <NavLink to={`/dogs/${id}`} className='nameDog'>{name}</NavLink>
            <div className="imgCard">
                <img src={image} alt="This is a Dog" className="image" onClick={() => { navigate(`/dogs/${id}`) }} />
                <div className="divTW">
                    <div className="divWeight"> <span className='block'>Weight: </span> {weight}</div>
                    <div className="divTemps"><span className='block'>Temperament:  </span>{temperament}</div>
                </div>
            </div>
        </div>
    )
}

