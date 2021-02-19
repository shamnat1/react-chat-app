import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/RestaurantService";
import { Link } from "react-router-dom";

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        retrieveRestaurants();
    }, []);


    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>Restaurants List</h4>

                <ul className="list-group">
                    {restaurants &&
                    restaurants.map((restaurant, index) => (
                        <li className="list-group-item "
                            key={restaurant.name.toString()}>
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
                        </li>

                    ))}
                </ul>


            </div>

        </div>

    );
};

export default RestaurantsList;