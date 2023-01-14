import { } from "../actions/types";

const initialState = {
    myFavorites: [],
    allCharacter: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {


        default:
            return {
                ...state
            }
    }
}

export default rootReducer;