import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRestaurant from "./components/AddRestaurant";
import RestaurantsList from "./components/RestaurantList";
import RestaurantMap from "./components/RestaurantMap";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/restaurants" className="navbar-brand">
                    Home
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/restaurants"} className="nav-link">
                            Restaurants
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/map"} className="nav-link">
                            Map
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
                    <Route exact path="/add" component={AddRestaurant} />
                    <Route exact path="/map" component={RestaurantMap} />
                </Switch>
            </div>
        </div>
    );
}

export default App;