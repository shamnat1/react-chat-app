import {ActionTypes} from'../constants/action-types'

export const setCountries = (countries) =>{
    return {
        type : ActionTypes.SET_COUNTRIES,
        payload : countries
    }
};

export const setCountryPopulation = (country_population) =>{
    return {
        type : ActionTypes.SET_COUNTRY_POPULATION,
        payload : country_population
    }
};
