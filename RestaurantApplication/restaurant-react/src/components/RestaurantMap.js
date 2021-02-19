import RestaurantDataService from "../services/RestaurantService";
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';
import React, { useState, useEffect } from "react";
const mapStyles = {
    width: '100%',
    heigth: '100%',
};

export class RestaurantMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation :{ lat:25.2048, lng: 55.2708},
            restaurants: [],
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: true
        }
    }
    async componentDidMount () {
        this.retrieveRestaurants();
        this.getCurrentLocation();

    }
    getCurrentLocation = () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.setState({currentLocation: pos})
            });
        }
    }
    retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                // setRestaurants(response.data);
                this.setState({
                    restaurants : response.data
                })
            })
            .catch(e => {
                console.log(e);
            });
    };


    displayMarkers = () => {
        return this.state.restaurants.map((restaurant, index) => {
            return <Marker key={index} id={index} position={{
            lat: restaurant.lat,
            lng: restaurant.log
          }}
                           name={restaurant.name}
                           onClick={this.onMarkerClick}>
            </Marker>
        })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <div className="row">

                <div className="col-lg-12 vh-100">
                    <h4>Restaurants Map</h4>
                    <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        center={this.state.currentLocation}
                        initialCenter={this.state.currentLocation}
                    >
                        {this.displayMarkers()}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            onClose={this.onClose}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h5>{this.state.selectedPlace.name}</h5>
                                <h4>{this.state.selectedPlace.address}</h4>
                            </div>
                        </InfoWindow>

                    </Map>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey:process.env.REACT_APP_GOOGLE_API_KEY
})(RestaurantMap);