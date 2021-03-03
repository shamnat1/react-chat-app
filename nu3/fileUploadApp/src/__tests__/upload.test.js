process.env.NODE_ENV = "test";
process.env.PORT = "8081";
const db = require("../models");
const request = require('supertest')
const fs = require('mz/fs');
const app = require('../server')

let Inventory;
let Product;
let ProductImage;

beforeAll(async () => {
     Inventory = db.inventory;
     Product = db.products;
     ProductImage = db.productImage;
});


afterAll(async () => {
    db.sequelize.sync({ force: false })
    // db.sequelize.close()
});



describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe("GET Requests  ", () => {

    describe("GET /upload  ", () => {
        test("It should respond with an Upload.html page", async() => {
            const response = await request(app).get("/upload");
            expect(response.type).toEqual('text/html');
            expect(response.status).toBe(200);
        });
    });

    describe("GET /api/csv/upload_history  ", () => {
        test("It should respond with file list", async() => {
            const response = await request(app).get("/api/csv/upload_history");
            expect(response.type).toEqual('application/json');
            expect(typeof response.body).toBe('object');
            expect(response.status).toBe(200);
        });
    });
});

describe(" Product GET Requests  ", () => {

    describe("GET /products  ", () => {
        test("It should respond with an products.html page", async() => {
            const response = await request(app).get("/products");
            expect(response.type).toEqual('text/html');
            expect(response.status).toBe(200);
        });
    });

    describe("GET /product/list  ", () => {
        test("It should respond with product list", async() => {
            const response = await request(app).get("/product/list");
            expect(response.type).toEqual('application/json');
            expect(typeof response.body).toBe('object');
            expect(response.status).toBe(200);
        });
    });
});

describe(" Inventory GET Requests  ", () => {

    describe("GET /inventories  ", () => {
        test("It should respond with an inventory.html page", async() => {
            const response = await request(app).get("/inventories");
            expect(response.type).toEqual('text/html');
            expect(response.status).toBe(200);
        });
    });

    describe("GET /inventory/list  ", () => {
        test("It should respond with inventory list", async() => {
            const response = await request(app).get("/inventory/list");
            expect(response.type).toEqual('application/json');
            expect(typeof response.body).toBe('object');
            expect(response.status).toBe(200);
        });
    });
});

describe('POST /api/csv/upload - upload files', () => {
    describe('POST /api/csv/upload - upload CSV file for Inventory', () => {
        const filePath = `${__dirname}/testFiles/inventory_test.csv`;

        it('upload csv file for inventory', () => {
            // Test if the test file is exist
            fs.exists(filePath)
                .then((exists) => {
                    if (!exists) throw new Error('file does not exist');
                    return request(app)
                        .post('/api/csv/upload')
                        .attach('file-to-upload', filePath)
                        .then((res) => {
                            const {success, message, filePath} = res.body;
                            expect(success).toBeTruthy();
                            expect(message).toBe('File Uploaded successfully');
                            expect(res.status).toBe(200);
                            expect(typeof filePath).toBeTruthy();
                        })
                        .catch(err => console.log(err));
                })
        })
    })

    describe('POST /api/csv/upload - upload XML file for Products', () => {
        const filePath = `${__dirname}/testFiles/products_test.xml`;

        it('upload csv file for products', () => {
            // Test if the test file is exist
            fs.exists(filePath)
                .then((exists) => {
                    if (!exists) throw new Error('file does not exist');
                    return request(app)
                        .post('/api/csv/upload')
                        .attach('file-to-upload', filePath)
                        .then((res) => {
                            const {success, message, filePath} = res.body;
                            expect(success).toBeTruthy();
                            expect(message).toBe('File Uploaded successfully');
                            expect(res.status).toBe(200);
                            expect(typeof filePath).toBeTruthy();
                        })
                        .catch(err => console.log(err));
                })
        })
    })
})