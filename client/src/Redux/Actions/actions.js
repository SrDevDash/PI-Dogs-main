import { GET_BREEDS, ERROR } from "./types"
import axios from 'axios'

const HOST = "localhost";
const PORT = "3001";


export const getBreeds = () => {
    return async function (dispatch) {
        try {
            let breeds = await axios(`http://${HOST}:${PORT}/dogs`)
            console.log(breeds.data);
            return dispatch({ type: GET_BREEDS, payload: breeds.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}