import { GET_BREEDS, ERROR, GET_BREEDS_BY_NAME, GET_TEMPERAMENTS, FILTER_BREEDS } from "./types"
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

export const getTemperament = () => {
    return async function (dispatch) {
        try {
            let temperaments = await axios(`http://${HOST}:${PORT}/temperaments`)
            return dispatch({ type: GET_TEMPERAMENTS, payload: temperaments.data.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}

export const filterBreeds = (filter) => {
    return function (dispatch) {
        return dispatch({ type: FILTER_BREEDS, payload: filter })
    }
}