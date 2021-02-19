import React, { useState } from "react";
import RestaurantDataService from "../services/RestaurantService";

const AddRestaurant = () => {
    const initialRestaurantState = {
        id: null,
        name: "",
        log:"",
        lat:"",
        address: ""
    };
    const [restaurant, setRestaurant] = useState(initialRestaurantState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const saveRestaurant = () => {
        var data = {
            name: restaurant.name,
            address: restaurant.address,
            log: restaurant.log,
            lat: restaurant.lat
        };
        RestaurantDataService.create(JSON.stringify(data))
            .then(response => {
                setRestaurant({
                    id: response.data.id,
                    name: response.data.name,
                    address: response.data.address,
                    log: response.data.log,
                    lat: response.data.lat
                });
                setSubmitted(true);
                console.log("response ",response.data);
            })
            .catch(e => {
                console.log("err",e);
            });
    };

    const newRestaurant = () => {
        setRestaurant(initialRestaurantState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newRestaurant}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={restaurant.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lat">Latitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lat"
                            required
                            value={restaurant.lat}
                            onChange={handleInputChange}
                            name="lat"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="log">Longitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="log"
                            required
                            value={restaurant.log}
                            onChange={handleInputChange}
                            name="log"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={restaurant.address}
                            onChange={handleInputChange}
                            name="address"
                        />
                    </div>

                    <button onClick={saveRestaurant} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddRestaurant;