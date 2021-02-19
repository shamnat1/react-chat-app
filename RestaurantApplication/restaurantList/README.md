## Application

Express js application to list and add restaurant. Restaurants are getting added to mongodb


```bash
$ npm install
```

## Quick Start

  Install dependencies:

```bash
$ npm install
```

 Start mongodb
```bash
$ mongod
```

  Start the server:

```bash
$ npm start
```

To run test:

```bash
$ npm test
```



  View the website at: http://localhost:3000/api/restaurant

API to list all the restaurants:
```bash
GET request :: http://localhost:3000/api/restaurant
```

API to add a restaurant
```bash
POST request :: http://localhost:3000/api/restaurant

Input sample:: {
                name: "Test Restaurant",
                lat: 25.2788,
                log: 55.3309,
                address: "Test Address"
            }
```

