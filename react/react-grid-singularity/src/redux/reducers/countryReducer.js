
import {ActionTypes} from '../constants/action-types'

const initialState = {
    country_population : [],
    countries : []
}
export const countryReducer = (state = initialState ,{type,payload}) =>{
    switch(type){
        case ActionTypes.SET_COUNTRIES :
            return {...state,countries:payload}  ;
        case ActionTypes.SET_COUNTRY_POPULATION :
            return {...state,country_population:payload}  ;
        default:
            return state;
    }
}