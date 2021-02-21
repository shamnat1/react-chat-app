import RestaurantDataService from "../services/RestaurantService";
import { Map, GoogleApiWrapper,Marker,InfoWindow,Circle } from 'google-maps-react';
import React, { useState, useEffect } from "react";
const mapStyles = {
    width: '100%',
    heigth: '100%',
};

export class RestaurantMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            centerLocation :{ lat:25.2048, lng: 55.2708},
            currentLocation :{},
            restaurants: [],
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: true,
            animateRestaurant:{}
        }
    }
    async componentDidMount () {
        await this.getCurrentLocation();
        this.retrieveRestaurants();


    }
    getCurrentLocation = async() =>{
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log("pos",pos)
                this.setState({
                    currentLocation: pos,
                    centerLocation:pos
                })
            });
        }
    }
    retrieveRestaurants = () => {

        RestaurantDataService.getAll()
            .then(response => {
                response.data.map((restaurant)=>{
                    restaurant.distance = this.getDistance({lat:restaurant.lat,lng:restaurant.log}   )
                })
                this.setState({
                    restaurants : response.data
                })
            })
            .catch(e => {
                console.log(e);
            });
    };


    displayMarkers = () => {
        const {animateRestaurant} = this.state
        console.log("animateRestaurant",animateRestaurant)
        return this.state.restaurants.map((restaurant, index) => {
            return <Marker key={index} id={index} position={{
            lat: restaurant.lat,
            lng: restaurant.log
          }}
                           animation={animateRestaurant?(restaurant.name === animateRestaurant.name?'1' : '0') : '0'}
                           name={restaurant.name}
                           onClick={this.onMarkerClick}>
            </Marker>
        })
    }

    rad = function(x) {
        return x * Math.PI / 180;
    };

    getDistance = function(p1) {
        const {currentLocation} = this.state;
        let p2 = currentLocation;
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        console.log(currentLocation,c)
        return Math.floor(d/1000,2); // returns the distance in meter
    };

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

    animateRestaurantItem = (restaurant) =>{
        console.log(restaurant)
        this.setState({
            animateRestaurant:restaurant,
            centerLocation:{lat:restaurant.lat,lng:restaurant.log}
        })
    }

    render() {
        const {restaurants} = this.state;
        return (
            <div className="row">

                <div className="col-lg-12 vh-100">
                    <h4>Restaurants Map</h4>
                    <Map
                        google={this.props.google}
                        zoom={11}
                        style={mapStyles}
                        center={this.state.centerLocation}
                        initialCenter={this.state.centerLocation}
                    >
                        <Circle
                            radius={5000}
                            center={this.state.currentLocation}
                            onMouseover={() => console.log('mouseover')}
                            onClick={() => console.log('click')}
                            onMouseout={() => console.log('mouseout')}
                            strokeColor='transparent'
                            strokeOpacity={0}
                            strokeWeight={5}
                            fillColor='#FF0000'
                            fillOpacity={0.2}
                        />
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

                    <ul className="d-flex justify-content-center">
                        {restaurants &&
                        restaurants.map((restaurant, index) => (
                            <li className="list-group-item "
                                key={restaurant.name.toString()}
                                onClick={this.animateRestaurantItem.bind(this,restaurant)}>
                                <div>
                                    <label>
                                        <strong>Title:</strong>
                                    </label>{" "}
                                    {restaurant.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Latitude:</strong>
                                    </label>{" "}
                                    {restaurant.lat}
                                </div>
                                <div>
                                    <label>
                                        <strong>Longitude:</strong>
                                    </label>{" "}
                                    {restaurant.log}
                                </div>
                                <div>
                                    <label>
                                        <strong>Address:</strong>
                                    </label>{" "}
                                    {restaurant.address}
                                </div>
                                <div>
                                    <label>
                                        <strong>Distance:</strong>
                                    </label>{" "}
                                    {restaurant.distance+' KM'}
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey:process.env.REACT_APP_GOOGLE_API_KEY
})(RestaurantMap);