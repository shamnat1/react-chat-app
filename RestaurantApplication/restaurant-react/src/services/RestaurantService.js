import http from "../http-common";

class RestaurantDataService {
    getAll() {
        return http.get("/restaurant");
    }

    create(data) {
        console.log("data",data);
        return http.post("/restaurant", data);
    }

}

export default new RestaurantDataService();