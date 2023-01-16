import { GET_BREEDS, GET_BREEDS_BY_NAME, ERROR } from "../Actions/types";

const initialState = {
    allBreeds: [],
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