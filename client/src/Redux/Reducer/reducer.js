import { GET_BREEDS, GET_BREEDS_BY_NAME, ERROR, GET_TEMPERAMENTS, FILTER_BREEDS } from "../Actions/types";
import { filter } from "./filterBreed";

const initialState = {
    allBreeds: [],
    temperaments: [],
    filterBreeds: [],
    errors: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                allBreeds: action.payload
            }

        case GET_BREEDS_BY_NAME:
            return {
                ...state,
                allBreeds: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case FILTER_BREEDS:
            const result = filter(action.payload, state.allBreeds);

            return {
                ...state,
                filterBreeds: result
            }

        case ERROR:
            console.log(action.payload);
            return {
                ...state,
                errors: action.payload
            }

        default:
            return {
                ...state,
            }
    }
}

export default rootReducer;