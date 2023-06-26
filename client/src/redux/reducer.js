import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOGS_BY_NAME, ADD_DOG, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, SET_LOADING, GET_TEMPS_DB } from "./actions";

const initialState = {
    allDogs: [],
    dogShown: [],
    temperaments: [],
    loading: "Loading..."
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEMPS_DB:
            return {
                ...state,
                temperaments: [...action.payload]
            }

        case GET_ALL_DOGS:
            return {
                ...state,
                dogShown: [...action.payload],
                allDogs: [...state.allDogs, ...action.payload]
                // esto está bien?????
            }

        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: [...action.payload]
            }

        case GET_DOGS_BY_NAME:
            console.log('reduciendo')
            return {
                ...state,
                dogShown: [...action.payload]
            }

        case ADD_DOG:
            return {
                ...state,
                allDogs: [...state.allDogs, action.payload]
            }

        case FILTER_BY_ORIGIN:
            let filteredByOrigin = []
            if (action.payload === 'Api') filteredByOrigin = state.allDogs.filter(dog => typeof dog.id === 'number')
            if (action.payload === 'User') filteredByOrigin = state.allDogs.filter(dog => typeof dog.id === 'string')
            if (action.payload === 'selectOrigin') filteredByOrigin = state.allDogs

            return {
                ...state,
                dogShown: filteredByOrigin
            }

        case FILTER_BY_TEMPERAMENT:
            let filterByTemperament = [];
            state.allDogs.forEach((dog) => {
                if (dog.temperament && dog.temperament.includes(action.payload)) {
                    filterByTemperament.push(dog)
                }
            })
            return {
                ...state,
                dogShown: filterByTemperament
            }

        case ORDER_BY_NAME:
            return {
                ...state,
                dogShown:
                    action.payload === 'ascName'
                        ? state.dogShown.toSorted((a, b) => a.name.localeCompare(b.name))
                        : state.dogShown.toSorted((a, b) => b.name.localeCompare(a.name))
            }

        case ORDER_BY_WEIGHT:

            return {
                ...state,
                dogShown: action.payload === 'ascWeight'
                    ? state.dogShown.toSorted((a, b) => a.minWeight - b.minWeight)
                    : state.dogShown.toSorted((a, b) => b.minWeight - a.minWeight)
            }

        case SET_LOADING:
            return {
                ...state,
                loading: (action.payload)
            }


        default: return {
            ...state
        };


    }
};

export default rootReducer;