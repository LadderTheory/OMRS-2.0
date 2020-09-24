import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:4000/private/'

//Service created for specific requests to the users collection within the database.
class UserService {
    getUsersList() {
      //return http.get("/users");
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

}
  export default new UserService();