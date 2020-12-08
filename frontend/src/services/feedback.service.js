import authHeader from './auth-header';
import axios from 'axios';

const API_URL = '/private/';

class Feedback {
  
  addFeedback(data) {
    return axios.post(API_URL + `feedback`, data, { headers: authHeader() });
  }

  getFeedback() {
    return axios.get(API_URL + `feedback`, { headers: authHeader() });
  }

  deleteFeedback(id) {
      return axios.delete(API_URL + `feedback/${id}`, { headers: authHeader() });
  }
}

export default new Feedback();