import './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import Selectors from '../Selectors/Selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import dogPaw from './dogPaw.png';


export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="navBar">
            {location.pathname !== '/dogs/newDog' && <SearchBar />}
            {location.pathname !== '/dogs' && <button onClick={() => { navigate(-1) }} className='homeBtn'> <span className="hide"> let's go home</span> <img src={dogPaw} alt="dogpaw" className="dogPaw" /> </button>}
            {location.pathname === '/dogs' && <Selectors />}
        </div>
    )
}