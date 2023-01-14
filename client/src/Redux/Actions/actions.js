import { ADD_FAVORITE } from "./types"


export const addFavorite = (favorite) => {
    return {
        type: ADD_FAVORITE,
        payload: favorite
    }
}