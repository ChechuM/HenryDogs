// 📍 HOME PAGE | la página principal de tu SPA debe contener:

// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
// Sector en el que se vea un listado de cards con los perros. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /dogs y deberá mostrar su:
// Imagen.
// Nombre.
// Temperamentos.
// Peso.
// Cuando se le hace click a una Card deberá redirigir al detalle de esa raza específica.
// Botones/Opciones para filtrar por temperamentos, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.
// Paginado: el listado de razas de perros se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 8 perros por página.
// ⚠️ IMPORTANTE: se deben mostrar tanto las razas de perros traidas desde la API como así también las de la base de datos, pero NO está permitido almacenar en la base de datos las razas de perros de la API. Solamente se pueden guardar aquellas creadas desde el form.

import './Home.css';
import Cards from '../Cards/Cards'
import { React, useEffect, useState } from 'react';
import * as actions from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import caretLeft from './caretLeft.png';
import caretRight from './caretRight.png';
import loadingDog from '../../img/loadingDog.gif';

export default function Home() {
    const dogShown = useSelector(store => store.dogShown)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(actions.getAllDogs());
        dispatch(actions.getTempsDB())
        return () => {
            dispatch(actions.setLoading(false))
        }
    }, [dispatch])

    // PAGINADO: creo otro estado local que setee el nro de página inicial y que luego permita cambiarlo

    const [currentPg, setCurrentPg] = useState(0);

    const ITEMS_PER_PAGE = 8;

    const nextHandler = () => {
        // éste handler va a cambiar el nro de página + 1
        if (currentPg + 1 >= Math.ceil(dogShown.length / ITEMS_PER_PAGE)) return
        setCurrentPg((currentPg) => currentPg + 1);
    };

    const prevHandler = () => {
        // éste handler va a cambiar el nro de página - 1
        if (currentPg >= 1) setCurrentPg((currentPg) => currentPg - 1);
        else return
    }

    return (
        <div>
            {(!loading) ? <div>
                <div className="test">
                    <span> page {currentPg + 1} from {Math.ceil(dogShown.length / ITEMS_PER_PAGE)} </span>
                    <div className="home">

                        <div className="prevBar" onClick={() => prevHandler()}> <img src={caretLeft} alt="" className="imgCaret" />  </div>

                        <div className='cards'>
                            <Cards currentPg={currentPg} ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
                        </div>

                        <div className="nextBar" onClick={() => nextHandler()}> <img src={caretRight} alt="" className="imgCaret" />   </div>
                    </div>

                </div>
            </div>
                : <div>
                    <img src={loadingDog} alt='Loading resources' />
                    <p>{loading}</p>
                </div>
            }
        </div>
    )
}

