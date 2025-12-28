const request = require('supertest');
const BaseURL = 'https://petstore.swagger.io/v2';

class Pet {
  static async create(data) {
    return await request(BaseURL)
      .post('/pet')
      .set({ 'Content-Type': 'application/json', 
                'Accept': 'application/json' })
      .send(data);      
    return response;
  }
}

module.exports = Pet;