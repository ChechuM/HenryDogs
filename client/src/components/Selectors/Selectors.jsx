// Botones/Opciones para filtrar por temperamentos, y 
// por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.

import './Selectors.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

export default function Selectors() {
    const dispatch = useDispatch();
    const temperaments = useSelector(store => store.temperaments)

    const filterByOrigin = (event) => {
        let value = event.target.value;
        dispatch(actions.filterByOrigin(value))
    }

    const orderByName = (event) => {
        let value = event.target.value;
        dispatch(actions.orderByName(value))
    }

    const orderByWeight = (event) => {
        let value = event.target.value;
        dispatch(actions.orderByWeight(value))
    }

    const filterByTemperament = (event) => {
        let value = event.target.value;
        dispatch(actions.filterByTemperament(value))
    }

    return (
        <div className="bigDiv">

            <div className='selectTemp'>
                <span className='spanTitle'>Filter by Temperament: </span>
                <select className='selectBar' onChange={filterByTemperament}>
                    <option value="selectTemperament">Select a temperament...</option>
                    {
                        temperaments.map((t) => {
                            return <option value={t}>{t}</option>
                        })
                    }
                </select>
            </div>

            <div className='selectOrigin'>
                <span className='spanTitle'>Filter by Origin: </span>
                <select className='selectBar' onChange={filterByOrigin}>
                    <option value="selectOrigin">Select origin...</option>
                    <option value="Api" >From Api</option>
                    <option value="User" >Created by User</option>
                </select>
            </div>

            <div className='orderByName'>
                <span className='spanTitle'>Order by Name: </span>
                <select className='selectBar' onChange={orderByName}>
                    <option value="orderByName">Select order...</option>
                    <option value="ascName">From A to Z</option>
                    <option value="descName">From Z to A</option>
                </select>
            </div>

            <div className='orderByWeight'>
                <span className='spanTitle'>Order by Weight: </span>
                <select className='selectBar' onChange={orderByWeight}>
                    <option value="orderByWeight">Select order...</option>
                    <option value="ascWeight">Small to Big</option>
                    <option value="descWeight">Big to Small</option>
                </select>
            </div>
        </div>
    )
}