import { GET_BREEDS, GET_BREEDS_BY_NAME, ERROR, GET_TEMPERAMENTS, FILTER_BREEDS, DETAILS_BREED, CREATE_BREED, CLEAR_DETAIL_BREED } from "../Actions/types";
import { filter } from "./filterBreed";

const initialState = {
    allBreeds: [],
    temperaments: [],
    filterBreeds: [],
    detailsBreed: null,
    errors: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                allBreeds: action.payload,
                filterBreeds: action.payload
            }

        case GET_BREEDS_BY_NAME:
            return {
                ...state,
                filterBreeds: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case FILTER_BREEDS:
            const result = filter(action.payload, [...state.allBreeds]);

            return {
                ...state,
                filterBreeds: result
            }


        case DETAILS_BREED:
            return {
                ...state,
                detailsBreed: action.payload
            }

        case CREATE_BREED:
            return {
                ...state,
                allBreeds: [...state.allBreeds, action.payload]
            }

        case CLEAR_DETAIL_BREED:
            return {
                ...state,
                detailsBreed: null
            }

        case ERROR:
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