import authHeader from './auth-header';
import axios from 'axios';
//uses axios to send an http request from the frontend to the backend, each http request below starts with the address of the API Endpoint(if applicable also an id in req.params), then if there is data to be sent(req.body) and finally the header (contains the authorization token)
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