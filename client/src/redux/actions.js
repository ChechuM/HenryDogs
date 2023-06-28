import axios from "axios";

export const GET_ALL_DOGS = 'GET_ALL_DOGS'
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS'
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME'
export const ADD_DOG = 'ADD_DOG'
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'
export const SET_LOADING = 'SET_LOADING';
export const GET_TEMPS_DB = 'GET_TEMPS_DB';
export const INTERSECT = 'INTERSECT';
export const DELETE_DOG = 'DELETE_DOG'


export const deleteDog = (id) => async dispatch => {
    //si es un perro de la DB pego a la ruta delete 
    if (typeof id === 'string') await axios.delete(`http://localhost:3001/dogs/${id}`)
    // además despacho la action para eliminar el perro del estado global
    try {
        return dispatch(
            {
                type: DELETE_DOG,
                payload: id
            }
        )
    }
    catch (error) {
        return error
    }
}


export const intersect = () => async dispatch => {
    try {
        return dispatch(
            {
                type: INTERSECT,
            }
        )
    }
    catch (error) {
        return error
    }
}

export const getTempsDB = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:3001/temperaments/db')
        let payload = response.data.map((temp) => {
            return temp.name
        })

        return dispatch(
            {
                type: GET_TEMPS_DB,
                payload: payload
            }
        )
    }
    catch (error) {
        return error
    }
}
export const getAllDogs = () => async dispatch => {
    try {
        let response = await axios.get('http://localhost:3001/dogs')
        // es lo mismo que var response = await axios.get("/dogs") ?????????
        dispatch({
            type: SET_LOADING,
            payload: ""
        })
        return dispatch(
            {
                type: GET_ALL_DOGS,
                payload: response.data
            }
        )
    }
    catch (error) {
        return error
    }
}

export const getAllTemperaments = () => {
    return async function (dispatch) {
        let response = await axios.get('http://localhost:3001/temperaments')
        return dispatch(
            {
                type: GET_ALL_TEMPERAMENTS,
                payload: response.data
            }
        )
    }
}

export const getDogsByName = (dog) => {
    return async function (dispatch) {
        let response = await axios.get(`http://localhost:3001/dogs/name?name=${dog}`)

        return dispatch(
            {
                type: GET_DOGS_BY_NAME,
                payload: response.data
            }
        )
    }
}

export const addDog = (dog) => {

    let perro = {
        name: dog.name,
        image: dog.image,
        span: dog.span + ' years',
        height: dog.minHeight + ' - ' + dog.maxHeight + ' cm.',
        weight: dog.minWeight + ' - ' + dog.maxWeight + ' kg.',
        temperament: dog.temperaments.join(', ')
    }

    return async function (dispatch) {
        await axios.post('http://localhost:3001/dogs/newDog', { perro }) // se envía así porque es un post y envía un JSON!!!
            .then((response) => {
                return dispatch({
                    type: ADD_DOG,
                    payload: response
                })
            })
            .catch((err) => console.log(err))
    }
}

export const filterByTemperament = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament,
    }
}

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export const orderByWeight = (order) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload: order
    }
}

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload: payload
    }
}