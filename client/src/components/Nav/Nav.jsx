import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import Selectors from '../Selectors/Selectors';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="navBar">
            {location.pathname !== '/dogs/newDog' && <SearchBar />}
            {location.pathname !== '/dogs' && <button onClick={() => { navigate(-1) }} className='homeBtn'> back home! </button>}
            {location.pathname === '/dogs' && <Selectors />}
        </div>
    )
}