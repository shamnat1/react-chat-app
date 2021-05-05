import {combineReducers} from 'redux'
import {countryReducer} from './countryReducer'

const reducer = combineReducers({
    allCountries : countryReducer
})

export default reducer;