const chai = require('chai');
const expect = chai.expect;
const Pet = require('../Services/Pet');
const Store = require('../Services/Store');
const User = require('../Services/User');

let token;
let createdstore;
let createduser;

describe('API Testing Petstore (POM)', function() {
  this.timeout(10000);

//   before(async function() {
//     const authResponse = await Auth.createToken("admin", "password123");
//     token = authResponse.body.token;
//     console.log("Generated Token:", token);
//   });

  context('Pet', function() {
    it('Post Create Pet', async function() {
      const response = await Pet.create({
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
      });
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });
  });

  context('Store', function() {
    it('Create Store', async function() {
      const requestBody = {
        id: 1,
        petId: 1,
        quantity: 1,
        shipDate: "2025-07-23T07:58:22.760Z",
        status: "placed",
        complete: true
      };
      const response = await Store.create(requestBody);
      createdstore = response.body.id;
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });

    it('Get Store by ID', async function() {
      const response = await Store.getById(1);
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });

    it('Get All Store', async function() {
      const response = await Store.getAll();
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });

    it('Delete Store', async function() {
      const response = await Store.deleteById(createdstore, token);
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });
  });

  context('User', function() {
    it('Create User', async function() {
      const uniqueUsername = `myskill_${Date.now()}`;
      const requestBody = {
        id: Date.now(), // ✅ ID unik
        username: uniqueUsername,
        firstName: "My",
        lastName: "Skill",
        email: `${uniqueUsername}@example.com`,
        password: "password123",
        phone: "1234567890",
        userStatus: 1
    };
      const response = await User.create(requestBody);
      createduser = requestBody.username;
      console.log("Created user:", createduser);
      expect(response.status).to.equal(200);
    });

    it('Get Login User by Params', async function() { 
      const params = { username: "myskill", password: "123" }; 
      const response = await User.getLoginByParams(params); 
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status); 
      expect(response.status).to.equal(200); 
    });

    it('Get Logout User by Params', async function() { 
      const params = { username: 'myskill', password: '123' }; 
      const response = await User.getLogoutByParams(params); 
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status); 
      expect(response.status).to.equal(200);
    });

    it('Get Login User by Params Username', async function() { 
      const params = { username: 'myskill' }; 
      const response = await User.getLoginByParamsUsername(params); 
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status); 
      expect(response.status).to.equal(200); 
    });

    it('Update User', async function() {
      const requestBody = {
        id: 123, 
        username: "myskill123",  
        firstName: "My", 
        lastName: "Skill", 
        email: "myskill123@example.com",
        password: "password123", 
        phone: "1234567890",
        userStatus: 1
      };
      const response = await User.update(createduser,requestBody,token);
      console.log('Response Body:', response.body); 
      console.log('Status Code:', response.status);
      expect(response.status).to.equal(200);
    });

    it('Delete User', async function() {
    console.log("Deleting user:", createduser); // cek dulu nilainya
    const response = await User.delete(createduser);
    console.log('Response Body:', response.body); 
    console.log('Status Code:', response.status);
    expect(response.status).to.equal(200); // Petstore balikin 200
    });
 });
});
