import React, { useState } from 'react';
import './Selectors.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

export default function Selectors() {
    const dispatch = useDispatch();
    const temperaments = useSelector((store) => store.temperaments);
    const [selectValues, setSelectValues] = useState({
        temperament: 'selectTemperament',
        origin: 'selectOrigin',
        nameOrder: 'orderByName',
        weightOrder: 'orderByWeight',
    });

    const filterByOrigin = (event) => {
        const value = event.target.value;
        dispatch(actions.filterByOrigin(value));
        dispatch(actions.intersect());
        setSelectValues((prevState) => ({ ...prevState, origin: value }));
    };

    const orderByName = (event) => {
        const value = event.target.value;
        dispatch(actions.orderByName(value));
        dispatch(actions.intersect());
        setSelectValues((prevState) => ({ ...prevState, nameOrder: value }));
    };

    const orderByWeight = (event) => {
        const value = event.target.value;
        dispatch(actions.orderByWeight(value));
        dispatch(actions.intersect());
        setSelectValues((prevState) => ({ ...prevState, weightOrder: value }));
    };

    const filterByTemperament = (event) => {
        const value = event.target.value;
        dispatch(actions.filterByTemperament(value));
        dispatch(actions.intersect());
        setSelectValues((prevState) => ({ ...prevState, temperament: value }));
    };

    const resetSelectValues = () => {
        setSelectValues({
            temperament: 'selectTemperament',
            origin: 'selectOrigin',
            nameOrder: 'orderByName',
            weightOrder: 'orderByWeight',
        });
        dispatch(actions.getAllDogs())
    };

    return (
        <div className="bigDiv">
            <div className="selectTemp">
                <span className="spanTitle">Filter by Temperament: </span>
                <select className="selectBar" value={selectValues.temperament} onChange={filterByTemperament}>
                    <option value="selectTemperament">Select a temperament...</option>
                    {temperaments.map((t) => {
                        return <option key={t} value={t}>{t}</option>;
                    })}
                </select>
            </div>

            <div className="selectOrigin">
                <span className="spanTitle">Filter by Origin: </span>
                <select className="selectBar" value={selectValues.origin} onChange={filterByOrigin}>
                    <option value="selectOrigin">Select origin...</option>
                    <option value="Api">From Api</option>
                    <option value="User">Created by User</option>
                </select>
            </div>

            <div className="orderByName">
                <span className="spanTitle">Order by Name: </span>
                <select className="selectBar" value={selectValues.nameOrder} onChange={orderByName}>
                    <option value="orderByName">Select order...</option>
                    <option value="ascName">From A to Z</option>
                    <option value="descName">From Z to A</option>
                </select>
            </div>

            <div className="orderByWeight">
                <span className="spanTitle">Order by Weight: </span>
                <select className="selectBar" value={selectValues.weightOrder} onChange={orderByWeight}>
                    <option value="orderByWeight">Select order...</option>
                    <option value="ascWeight">Small to Big</option>
                    <option value="descWeight">Big to Small</option>
                </select>
            </div>

            <button className='resetFilter' onClick={resetSelectValues}>Reset</button>
        </div>
    );
}