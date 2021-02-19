//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let server = require('../server');
let mongoose = require("mongoose");
let Restaurant = require('../src/models/restaurant.model');
// module.exports = server
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();


chai.use(chaiHttp);



//Our parent block
describe(' Restaurants', () => {

    /*
     * Test the /GET route
     */
    describe('/GET Restaurant', () => {
        it('it should GET all the restaurant List', (done) => {
            // chai.request("http://localhost:8080")
            chai.request(server)
                .get('/api/restaurant')
                .end((err, res) => {
                    // console.log ("Result Body:", res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log ("Got",res.body.length, " docs")
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST restaurant', () => {
        it('It should add restaurant in DB', (done) => {
            let restaurant = {
                name: "Deira Test Restaurant",
                lat: 25.2788,
                log: 55.3309,
                address: "Deira"
            }
            chai.request(server)
                .post('/api/restaurant')
                .send(restaurant)
                .end((err, res) => {
                    // console.log("res",res)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

});