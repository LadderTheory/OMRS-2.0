import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/private/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getMissionsList() {
    return axios.get(API_URL + 'missions', { headers: authHeader() });
  }

  updateMissionList() {
    return axios.patch(API_URL + 'missions/:id')
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  
}

export default new UserService();
