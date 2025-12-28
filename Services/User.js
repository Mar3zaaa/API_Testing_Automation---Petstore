const request = require('supertest');
const BaseURL = 'https://petstore.swagger.io/v2';

class User {
  static async create(data) {
    return await request(BaseURL)
      .post('/user')
      .set({ 'Content-Type': 'application/json', 
                'Accept': 'application/json' })
      .send(data);      
    return response;
  }

  static async getLoginByParams(params) { 
    return await request(BaseURL) 
    .get('/user/login') 
    .query(params) // kirim query string 
    .set('Accept', 'application/json'); 
  }

  static async getLogoutByParams(params) { 
    return await request(BaseURL) 
    .get('/user/logout') 
    .query(params) // kirim query string 
    .set('Accept', 'application/json'); 
  }

  static async getLoginByParamsUsername(params) { 
    return await request(BaseURL) 
    .get('/user/login') 
    .query(params) // kirim query string 
    .set('Accept', 'application/json'); 
  }

  static async update(username, data, token) {
    return await request(BaseURL)
      .put(`/user/${username}`)
      .set({ 'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'Cookie': `token=${token}` })
      .send(data);
  }

  static async delete(username) {
  return await request(BaseURL)
    .delete(`/user/${username}`)
    .set({ 'Accept': 'application/json' });
 }
}
module.exports = User;