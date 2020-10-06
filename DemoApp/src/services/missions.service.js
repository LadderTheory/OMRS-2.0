import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://mm.sst.com/private/';
const API_URL = 'http://localhost:4000/private/';

class MissionsService {
  
  addAirLiftMsn(data) {
    return axios.post(API_URL + `airliftmsn`, data, { headers: authHeader() });
  }

  getAirLiftMsns() {
    return axios.get(API_URL + `airliftmsn`, { headers: authHeader() });
  }
  
  getMissionsList() {
    return axios.get(API_URL + 'missions', { headers: authHeader() });
  }

  getMsnByID(id) {
      return axios.get(API_URL + `missions/${id}`, { headers: authHeader() });
  }

  getAirLiftMsnByID(id) {
    return axios.get(API_URL + `airliftmsn/byID/${id}`, { headers: authHeader() });
}

  updateAirliftMsn(id, data) {
    return axios.patch(API_URL + `airliftmsn/update/${id}`, data, { headers: authHeader() })
  }

  addMission(data) {
    return axios.post(API_URL + `missions`, data, { headers: authHeader() })
  }

  deleteMission(id) {
    return axios.delete(API_URL + `missions/${id}`, { headers: authHeader() })
  }

  findByMsnNum(msnnum) {
    return axios.get(API_URL + `airliftmsn/bymsnnum/${msnnum}`, { headers: authHeader() })
  }

  findBySquadron(squadron) {
    return axios.get(API_URL + `missions/squadron/${squadron}`, { headers: authHeader() })
  }

  findByDateRange(data) {
    return axios.get(API_URL + `missions/msnDate/`, data, { headers: authHeader() });
  }

  findByParameters(data) {
    return axios.get(API_URL + `missions/msnSearch/`, data, { headers: authHeader() })
  }
}

export default new MissionsService();