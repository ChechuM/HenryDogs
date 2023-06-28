import './Card.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import defaultIcon from '../Form/defaultIcon';
import * as actions from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import loadingDog from '../../img/loadingDog.gif';

export default function Card({ id, name, image, temperament, weight }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)


    if (!image) {
        image = defaultIcon
    }

    const handleDelete = (id) => {
        dispatch(actions.deleteDog(id))
    }

    return (
        <div>
            {(!loading) ? <div>
                <div className="upperDiv">
                    <div className="nameX">
                        <NavLink to={`/dogs/${id}`} className='nameDog'>{name}</NavLink>
                        {
                            (typeof id === 'string') && <button className='buttonX' onClick={() => handleDelete(id)}>X</button>
                        }
                    </div>

                    <div className="imgCard">
                        <img src={image} alt="This is a Dog" className="image" onClick={() => { navigate(`/dogs/${id}`) }} />
                        <div className="divTW">
                            <div className="divWeight"> <span className='block'>Weight: </span> {weight}</div>
                            <div className="divTemps"><span className='block'>Temperament:  </span>{temperament}</div>
                        </div>
                    </div>
                </div>
                {/* fin del div upperDiv */}
            </div>
                : <div>
                    <img src={loadingDog} alt='Loading resources' />
                    <p>{loading}</p>
                </div>
            }
        </div>
    )
}

