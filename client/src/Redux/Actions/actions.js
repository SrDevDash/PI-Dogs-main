import { DETAILS_BREED, GET_BREEDS, ERROR, GET_BREEDS_BY_NAME, GET_TEMPERAMENTS, FILTER_BREEDS, CREATE_BREED, CLEAR_DETAIL_BREED } from "./types"
import axios from 'axios'


const { REACT_APP_HOST } = process.env;
const HOST = REACT_APP_HOST;

export const getBreeds = () => {
    return async function (dispatch) {
        try {
            let breeds = await axios(`https://${HOST}/dogs`)
            return dispatch({ type: GET_BREEDS, payload: breeds.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}

export const getBreedsByName = (name) => {
    return async function (dispatch) {
        try {
            let breeds = await axios(`https://${HOST}/dogs?name=${name}`)
            if (!breeds.data?.msg) return dispatch({ type: GET_BREEDS_BY_NAME, payload: breeds.data })
            return dispatch({ type: ERROR, payload: breeds.data.msg })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error.message })
        }
    }
}

export const getTemperament = () => {
    return async function (dispatch) {
        try {
            let temperaments = await axios(`https://${HOST}/temperaments`)
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

export const detailBreed = (id) => {
    return async function (dispatch) {
        try {
            let breed = await axios(`https://${HOST}/breeds/${id}`);

            return dispatch({ type: DETAILS_BREED, payload: breed.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}

export const createBreed = (data) => {
    return async function (dispatch) {
        try {
            let breed = await axios.post(`https://${HOST}/breed`, data);

            return dispatch({ type: CREATE_BREED, payload: breed.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error.message })
        }
    }
}
export const clearBreed = () => {
    return function (dispatch) {
        return dispatch({ type: CLEAR_DETAIL_BREED, payload: {} })
    }
}