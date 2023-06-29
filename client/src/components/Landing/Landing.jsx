
// Página de inicio o bienvenida con:
// * Imagen de fondo representativa al proyecto.
// * Botón para ingresar a la home page.

import './Landing.css';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {

    const navigate = useNavigate();
    const getStarted = () => {
        navigate('/dogs');
    }

    return (
        <div className="landing">
            <div className="welcome">
                <h1 className="message">Welcome to Henry Dogs</h1>
                <button className="start" onClick={() => { getStarted() }}>Show Me!</button>
                <div className="bottom">Project by Cecilia Moroni for Henry <img src='https://pbs.twimg.com/profile_images/1542845396032135168/o5AmaQyh_400x400.jpg' alt='logoHenry' className='logoHenry' /></div>
            </div>
        </div>
    )
}
