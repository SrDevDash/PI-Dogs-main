import { GET_BREEDS, ERROR, GET_BREEDS_BY_NAME } from "./types"
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

export const getBreedsByName = (name) => {
    return async function (dispatch) {
        try {
            let breeds = await axios(`http://${HOST}:${PORT}/dogs?name=${name}`)
            if (!breeds.data?.msg) return dispatch({ type: GET_BREEDS_BY_NAME, payload: breeds.data })
            return dispatch({ type: ERROR, payload: breeds.data.msg })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}