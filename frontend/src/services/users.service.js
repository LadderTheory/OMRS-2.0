import axios from 'axios';
import authHeader from './auth-header'

const API_URL = '/private/'

//Service created for specific requests to the users collection within the database.
class UserService {
    getUsersList() {
      return axios.get(API_URL + `users`, { headers: authHeader() });
    }
  
    getUserByID(id) {
      return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
    }
  
    updateUserInfo(id, data) {
      return axios.patch(API_URL + `users/${id}`, data, { headers: authHeader() });
    }
  
    deleteUser(id) {
      return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
    }

    makeAdmin(id) {
      return axios.get(API_URL + `users/admin/${id}`, { headers: authHeader() });
    }

    makeActive(id) {
      return axios.get(API_URL + `users/activate/${id}`, { headers: authHeader() });
    }

}
  export default new UserService();