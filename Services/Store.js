const request = require('supertest');
const BaseURL = 'https://petstore.swagger.io/v2';

class Store {
  static async create(data) {
    return await request(BaseURL)
      .post('/store/order')
      .set({ 'Content-Type': 'application/json', 
                'Accept': 'application/json' })
      .send(data);      
    return response;
  }

  static async getById(id) {
    return await request(BaseURL)
    .get(`/store/order/${id}`)
    .set('Accept', 'application/json');
  }

  static async getAll() {
    return await request(BaseURL)
    .get('/store/inventory')
    .set('Accept', 'application/json');
  }

  static async deleteById(id, token) {
    return await request(BaseURL)
      .delete(`/store/order/${id}`)
      .set({ 'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'Cookie': `token=${token}` });
  }
}

module.exports = Store;