import React, { useState, useEffect } from "react";
import axios from 'axios';
const getCountryList = async() => {

        try {
            const response = await axios.get('http://api.worldbank.org/v2/country?format=json&per_page=297')
            console.log("response ",response)
            if(response && response.data && response.data.length>1)
                return response.data[1];
        }catch(error) {
            console.error(error)
        }
};

const getCountryPopulation = async(url,searchVal) => {
    // const dispatch = useDispatch();

    try {
        const response = await axios.get(`${url}${searchVal}`)

        const countryPopulationList = response && response.data ? response.data : []

        console.log("countryPopulationList",countryPopulationList)
        return countryPopulationList;
    }catch(error) {
        console.error(error)
    }
};

const regionList = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ]
const regionUrl = 'https://restcountries.eu/rest/v2/region/';
const countryUrl = 'https://restcountries.eu/rest/v2/name/';


export  {getCountryList,getCountryPopulation,regionList,regionUrl,countryUrl} ;
