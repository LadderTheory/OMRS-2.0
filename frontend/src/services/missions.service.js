import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/private/';

class MissionsService {
  
  addAirLiftMsn(data) {
    return axios.post(API_URL + `airliftmsn`, data, { headers: authHeader() });
  }

  getAirLiftMsns() {
    return axios.get(API_URL + `airliftmsn`, { headers: authHeader() });
  }

  getAirLiftMsnByID(id) {
    return axios.get(API_URL + `airliftmsn/byID/${id}`, { headers: authHeader() });
  }

  updateAirliftMsn(id, data) {
    return axios.patch(API_URL + `airliftmsn/update/${id}`, data, { headers: authHeader() })
  }

  findByMsnNum(msnnum) {
    return axios.get(API_URL + `airliftmsn/bymsnnum/${msnnum}`, { headers: authHeader() })
  }

  findBySquadron(squadron) {
    return axios.get(API_URL + `missions/squadron/${squadron}`, { headers: authHeader() })
  }

  findByDateRange(data) {
    return axios.post(API_URL + `airliftmsn/bydate`, data, { headers: authHeader() });
  }

  getDistinctCallSigns() {
    return axios.get(API_URL + `airliftmsn/distinctCallSign`, { headers: authHeader() });
  }

  findByParameters(data) {
    return axios.post(API_URL + `airliftmsn/msnreports`, data, { headers: authHeader() })
  }
}

export default new MissionsService();