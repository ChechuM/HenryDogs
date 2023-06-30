import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOGS_BY_NAME, ADD_DOG, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, SET_LOADING, GET_TEMPS_DB, INTERSECT, DELETE_DOG } from "./actions";

const initialState = {
    allDogs: [],
    byTemperament: [],
    byOrigin: [],
    dogShown: [], // éste es el que se renderiza
    temperaments: [],
    loading: "Loading...",
    // currentPg: 0,
    // itemsPg: 8
}

function intersection(arr1, arr2, arr3) {
    // HERMOSO CODE Q ENCONTRE QUE BUSCA INTERESECCIONES -> los ordena por como aparecen en el primero
    // var array1 = [666, "Lorem", "quick", "ipsum", "dolor"],
    // array2 = ["Lorem", "ipsum", 666, "quick", "brown", "foo"],
    // array3 = ["quick","Jumps",666, "Over", "Lazy", "ipsum","quick", "Lorem"],
    // array4 = [1337, 420, 666, "Lorem","quick","ipsum"],
    // data = [array1, array2, array3, array4],
    // result = data.reduce((a, b) => a.filter(c => b.includes(c)));
    // console.log(result);
    var data = [arr1, arr2, arr3]
    var result = data.reduce((a, b) => a.filter(c => b.includes(c)));
    return result
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // case PG_HANDLER:
        //     const ITEMS_PER_PAGE = state.itemsPg
        //     let toPage = 0
        //     if (state.currentPg + 1 >= Math.ceil(state.dogShown.length / ITEMS_PER_PAGE)) return { ...state };
        //     if (state.currentPg <= 1) return { ...state }
        //     if (action.payload === 'next') toPage = state.currentPg + 1
        //     if (action.payload === 'prev') toPage = state.currentPg - 1;

        //     return {
        //         ...state,
        //         currentPg: toPage
        //     }

        case DELETE_DOG:
            const notDeleted = state.allDogs.filter(dog => dog.id !== action.payload)

            return {
                ...state,
                allDogs: notDeleted,
                dogShown: notDeleted
            }

        case GET_TEMPS_DB:
            return {
                ...state,
                temperaments: [...action.payload]
            }

        case GET_ALL_DOGS:
            return {
                ...state,
                byTemperament: [...action.payload],
                byOrigin: [...action.payload],
                dogShown: [...action.payload],
                allDogs: [...action.payload]
            }

        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: [...action.payload]
            }

        case GET_DOGS_BY_NAME:
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
                byOrigin: filteredByOrigin
            }

        case FILTER_BY_TEMPERAMENT:
            let filterByTemperament = [];
            if (action.payload === 'selectTemperament') {
                return {
                    ...state,
                    byTemperament: state.allDogs
                }
            }
            state.allDogs.forEach((dog) => {
                if (dog.temperament && dog.temperament.includes(action.payload)) {
                    filterByTemperament.push(dog)
                }
            })
            return {
                ...state,
                byTemperament: filterByTemperament
            }

        case ORDER_BY_NAME:
            return {
                ...state,
                allDogs:
                    action.payload === 'ascName'
                        ? state.allDogs.toSorted((a, b) => a.name.localeCompare(b.name))
                        : state.allDogs.toSorted((a, b) => b.name.localeCompare(a.name))
            }

        case ORDER_BY_WEIGHT:

            return {
                ...state,
                allDogs: action.payload === 'ascWeight'
                    ? state.allDogs.toSorted((a, b) => a.minWeight - b.minWeight)
                    : state.allDogs.toSorted((a, b) => b.minWeight - a.minWeight)
            }

        case SET_LOADING:
            return {
                ...state,
                loading: (action.payload)
            }

        case INTERSECT:
            let interseccionado = intersection(state.allDogs, state.byTemperament, state.byOrigin)
            return {
                ...state,
                dogShown: interseccionado
            }

        default: return {
            ...state
        };
    }
};

export default rootReducer;