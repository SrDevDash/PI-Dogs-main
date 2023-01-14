import { GET_BREEDS } from "../Actions/types";

const initialState = {
    allBreeds: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREEDS:

            return {
                ...state,
                allBreeds: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer;