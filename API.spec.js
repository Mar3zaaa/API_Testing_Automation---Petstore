console.log('Running API tests...');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const BaseURL = 'https://petstore.swagger.io/v2';
let token;

describe('API Testing Petstore', function() {
    this.timeout(10000);
    before(async function() { 
        const authResponse = await request(BaseURL) 
        .post('/user') 
        .set('Content-Type', 'application/json') 
        .send({ id: 123, 
                username: "myskill",  
                firstName: "My", 
                lastName: "Skill", 
                email: "myskill@example.com",
                password: "password123", 
                phone: "1234567890",
                userStatus: 1 
            }); 
        expect(authResponse.status).to.equal(200);
        token = authResponse.body.token; 
        console.log("Generated Token:", token); });
    
    context('User', function() {
        const endpoint = '/user';
        it('Post Create User', async function(){ 
            const response = await request(BaseURL) 
            .post(endpoint) 
            .set('Content-Type', 'application/json') 
            .send({ id: 123, 
                username: "myskill",  
                firstName: "My", 
                lastName: "Skill", 
                email: "myskill@example.com",
                password: "password123", 
                phone: "1234567890",
                userStatus: 1 
            });  
            expect(response.status).to.equal(200); 
            token = response.body.token; // simpan token console.log('Token:', token); 
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);
        });

        it('Get Login User by Parameters', async function(){
            const params = {
                username: 'myskill',
                password: '123'
            };
            const response = await request(BaseURL)
                .get(endpoint + '/login')
                .query(params)
                .set('Accept', 'application/json');
                // Assertion pakai chai 
                expect(response.status).to.equal(200);
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);   
        });

        it('Get Logout User by Parameters', async function(){
            const params = {
                username: 'myskill',
                password: '123'
            };
            const response = await request(BaseURL)
                .get(endpoint + '/logout')
                .query(params)
                .set('Accept', 'application/json');
                // Assertion pakai chai 
                expect(response.status).to.equal(200);
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);   
        });

        it('Get Login User by Parameters username', async function(){
            const params = {
                username: 'myskill'
            };
            const response = await request(BaseURL)
                .get(endpoint + '/login')
                .query(params)
                .set('Accept', 'application/json');
                // Assertion pakai chai 
                expect(response.status).to.equal(200);
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);   
        });

        it('Put Update Data User by Username', async function(){
            const username = "myskill";
            const requestBody = {
                id: 123, 
                username: "myskill123",  
                firstName: "My", 
                lastName: "Skill", 
                email: "myskill@example.com",
                password: "password123", 
                phone: "1234567890",
                userStatus: 1 
            };
            const response = await request(BaseURL)
                .put(`${endpoint}/${username}`)
                .set({ 'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cookie': `token=${token}` })
                .send(requestBody);
            expect(response.status).to.equal(200);
            console.log('Response Body:', response.body);
            console.log('Status Code:', response.status);
        });

        it('Delete Data User by Username', async function(){
            const username = "myskill123";
            const response = await request(BaseURL)
                .delete(`${endpoint}/${username}`)
                .set({ 'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cookie': `token=${token}` });
            expect(response.status).to.equal(200);
            console.log('Response Body:', response.body);
            console.log('Status Code:', response.status);
        });
    });

    context(`Store`, function() {
        const endpoint = '/store';
        it('Post Create Data Store', async function(){
            const requestBody = {
                id: 1,
                petId: 1,
                quantity: 1,
                shipDate: "2025-07-23T07:58:22.760Z",
                status: "placed",
                complete: true
            };
            const response = await request(BaseURL)
                .post(endpoint + '/order')
                .set({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
                .send(requestBody);
            expect(response.status).to.equal(200);
            console.log('Response Body:', response.body);
            console.log('Status Code:', response.status);
        });

        it('Get Data Store by ID', async function(){
            const OrderId = 1;
            const response = await request(BaseURL)
                .get(`${endpoint + '/order'}/${OrderId}`)
                .set('Accept', 'application/json');
                // Assertion pakai chai 
                expect(response.status).to.equal(200);
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);   
        });

        it('Get Data Store', async function(){
            const response = await request(BaseURL)
                .get(endpoint + '/inventory')
                .set('Accept', 'application/json'); 
                // Assertion pakai chai 
                expect(response.status).to.equal(200);
            console.log('Response Body:', response.body); 
            console.log('Status Code:', response.status);   
        });

        it('Delete Data Store by ID', async function(){
            const OrderIdId = 1;
            const response = await request(BaseURL)
                .delete(`${endpoint + '/order'}/${OrderIdId}`)
                .set({ 'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cookie': `token=${token}` });
            expect(response.status).to.equal(200);
            console.log('Response Body:', response.body);
            console.log('Status Code:', response.status);
        });
    });

    context('Pet', function() {
        const endpoint = '/pet';
        it('Post Data Pet', async function(){
            const requestBody = {
                "id": 1,
                "category": {
                    "id": 1,
                    "name": "string"
                },
                "name": "doggie",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 1,
                        "name": "string"
                    }
                ],
                "status": "available"
            };
            const response = await request(BaseURL)
                .post(endpoint)
                .set({ 'Content-Type': 'application/json', 
                        'Accept': 'application/json' })
                .send(requestBody);
            expect(response.status).to.equal(200);
            console.log('Response Body:', response.body);
            console.log('Status Code:', response.status);
        });
    });
});    