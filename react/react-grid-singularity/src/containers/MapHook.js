import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import GoogleMapsApiLoader from "google-maps-api-loader";

const useGoogleMap = apiKey => {
    const [googleMap, setGoogleMap] = useState(null);
    useEffect(() => {
        GoogleMapsApiLoader({ apiKey }).then(google => {
            setGoogleMap(google);
        });
    }, []);
    return googleMap;
};

const useMap = ({ googleMap, mapContainerRef, initialConfig }) => {
    const [map, setMap] = useState(null);
    const country_population = useSelector((state) => state.allCountries.country_population)
    const markersList = []
    const clearMarkers = () =>{
        for (var i = 0; i < markersList.length; i++) {
            markersList[i].setMap(null);
        }
    }
    useEffect(
        () => {
            clearMarkers()
            console.log("country_population MAp ",country_population)
            if (!googleMap || !mapContainerRef.current) {
                return;
            }
            // map
            const map = new googleMap.maps.Map(
                mapContainerRef.current,
                initialConfig
            );
            // marker
            country_population.map(country => {
                if(country.latlng && country.latlng.length == 2) {
                    const marker = new googleMap.maps.Marker({
                        position: {lat: country.latlng[0], lng: country.latlng[1]}, //initialConfig.center,
                        map: map
                    });
                    const InfoWindow = new googleMap.maps.InfoWindow({
                        content: `<div id="content">
                    <h5>${country.name}</h5>
                    <span>Population : ${country.population}</span>
                      
                  </div>`
                    });
                    console.log(country.name)
                    marker.addListener("click", () => {
                        InfoWindow.open(map, marker);
                    });
                    markersList.push(marker)
                }
            })

            setMap(map);
        },
        [googleMap, mapContainerRef,country_population]
    );
    return map;
};

export { useGoogleMap, useMap };
