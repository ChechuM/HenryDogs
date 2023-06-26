// * SearchBar: un input de búsqueda para encontrar videojuegos por nombre

import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../redux/actions';
import { useDispatch } from 'react-redux';
import dogButton from './dogButton.png'
import fetch from './fetch.png';

export default function SearchBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value)
    }

    const onSearch = (name) => {
        if (!name) return;
        dispatch(actions.getDogsByName(name))
    }

    return (
        <div className="barra">
            <button className="newdog" onClick={() => { navigate('/dogs/newDog') }}><img src={dogButton} alt="dogButton" className="dogButton" /> Let's Create
            </button><span> </span>
            <input type='search' className="input" value={input.name} onChange={handleSearch} placeholder=' Search your dog by name' />
            <span> </span>
            <button className="onSearch" onClick={() => onSearch(input)}>Fetch! <img src={fetch} alt="fetch" className="fetch" /> </button> <span> </span>
        </div>
    )
}