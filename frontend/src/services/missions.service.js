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

  findByFilter(data) {
    return axios.post(API_URL + `airliftmsn/msnfilter`, data, { headers: authHeader() });
  }

  getDistinctCallSigns() {
    return axios.get(API_URL + `airliftmsn/distinctcallsign`, { headers: authHeader() });
  }

  getLatestByCallsign(callsign) {
    return axios.get(API_URL + `airliftmsn/latestbycallsign/${callsign}`, { headers: authHeader() });
  }

  findByParameters(data) {
    return axios.post(API_URL + `airliftmsn/msnreports`, data, { headers: authHeader() })
  }

  deleteMsn(id) {
    return axios.delete(API_URL + `airliftmsn/delete/${id}`, { headers: authHeader() });
  }
}

export default new MissionsService();