import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import Selectors from '../Selectors/Selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="navBar">
            {location.pathname !== '/dogs/newDog' && <SearchBar />}
            {location.pathname !== '/dogs' && <button onClick={() => { navigate(-1) }} className='homeBtn'> <span className="hide"> let's go home</span>  <Icon icon={faPaw} style={{ color: "#005b47", }} size='2xl' />  </button>}
            {location.pathname === '/dogs' && <Selectors />}
        </div>
    )
}