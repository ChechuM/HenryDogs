import './Card.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import defaultIcon from '../Form/defaultIcon';
import * as actions from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Card({ id, name, image, temperament, weight }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!image) {
        image = defaultIcon
    }

    // crear un botoncito para eliminar el dog -> handleDelete
    const handleDelete = (id) => {
        //tiene que despachar la action deleteDog
        dispatch(actions.deleteDog(id))
    }

    return (
        <div className="upperDiv">
            {
                (typeof id === 'string') && <button onClick={() => handleDelete(id)}>X</button>
            }
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

