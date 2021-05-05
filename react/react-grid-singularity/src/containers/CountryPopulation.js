import React, { useRef,useEffect,useState,Fragment } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { useGoogleMap, useMap } from "./MapHook";
import DataGraph from "./DataGraph";
import {setCountries,setCountryPopulation} from '../redux/actions/countryActions'
import {Container,Row,Col} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {getCountryList,getCountryPopulation,regionList,regionUrl,countryUrl} from './common/CountryList';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const initialConfig = {
    zoom: 2,
    center: { lat:0, lng: 0}
};

const CountryMap = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [singleSelections, setSingleSelections] = useState([]);
    const countries = useSelector((state) => state.allCountries.countries)
    const dispatch = useDispatch();

    const fetchPopulation = async(url,searchVal) =>{
        try {
            const countryPopulationList = await getCountryPopulation(url,searchVal)
            dispatch(setCountryPopulation(countryPopulationList));
        }catch(error) {
            console.log(error)
        }
    }

    const selectRegion = (e)=>{
        fetchPopulation(regionUrl,e.target.value)
        setSelectedRegion(e.target.value)
        setSingleSelections([])
    }
    const selectCountryInputChange = (selected) =>{
        console.log(selected)
        if(selected.length >= 3) {
            fetchPopulation(countryUrl, selected);
            setSelectedRegion('')
        }
    }
    const selectCountry = (selected) =>{
        setSelectedRegion('')
        if(selected && selected[0] && selected[0].name) {
            console.log(selected, selected[0].name, singleSelections)
            fetchPopulation(countryUrl, selected[0].name);
        }
    }


    useEffect(async ()=>{
        const countryList = await getCountryList();
        dispatch(setCountries(countryList));
    },[])


    const googleMap = useGoogleMap(API_KEY);
    const mapContainerRef = useRef(null);
    useMap({ googleMap, mapContainerRef, initialConfig });
    return (

        <Container>
            <Row className="mb-4">
                <Col>
                    <select value={selectedRegion} key={selectedRegion} className="browser-default custom-select" onChange={selectRegion}>
                        <option>Select Region</option>
                        {
                            regionList.map((region,index)=>(
                                <option key={index} value={region}>{region}</option>
                            ))
                        }
                    </select>
                </Col>
                <Col>
                    <Typeahead
                        id="basic-typeahead-single"
                        labelKey="name"
                        onChange={selectedItems => {setSingleSelections(selectedItems);selectCountry(selectedItems)}}
                        onInputChange={input => selectCountryInputChange(input)}
                        options={countries}
                        placeholder="Choose a country..."
                        selected={singleSelections}
                    />
                </Col>
            </Row>
            <div
                style={{
                    height: "100vh",
                    width: "100%"
                  }}
                ref={mapContainerRef}
            />

            <DataGraph/>
        </Container>
    );
};

export default CountryMap;
