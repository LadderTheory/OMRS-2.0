import axiosInstance from './auth-header';

const API_URL = '/private/';

class Feedback {
  
  addFeedback(data) {
    return axiosInstance.post(API_URL + `feedback`, data);
  }

  getFeedback() {
    return axiosInstance.get(API_URL + `feedback`);
  }

  deleteFeedback(id) {
      return axiosInstance.delete(API_URL + `feedback/${id}`);
  }
}

export default new Feedback();