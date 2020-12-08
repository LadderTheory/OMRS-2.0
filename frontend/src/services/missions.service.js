import axiosInstance from './auth-header';

const API_URL = '/private/';

class MissionsService {
  
  addAirLiftMsn(data) {
    return axiosInstance.post(API_URL + `airliftmsn`, data);
  }

  getAirLiftMsns() {
    return axiosInstance.get(API_URL + `airliftmsn`);
  }

  getAirLiftMsnByID(id) {
    return axiosInstance.get(API_URL + `airliftmsn/byID/${id}`);
  }

  updateAirliftMsn(id, data) {
    return axiosInstance.patch(API_URL + `airliftmsn/update/${id}`)
  }

  findByMsnNum(msnnum) {
    return axiosInstance.get(API_URL + `airliftmsn/bymsnnum/${msnnum}`)
  }

  findBySquadron(squadron) {
    return axiosInstance.get(API_URL + `missions/squadron/${squadron}`)
  }

  findByFilter(data) {
    return axiosInstance.post(API_URL + `airliftmsn/msnfilter`, data);
  }

  // getDistinctCallSigns() {
  //   return axios.get(API_URL + `airliftmsn/distinctcallsign`, { headers: authHeader() });
  // }

  // getLatestByCallsign(callsign) {
  //   return axios.get(API_URL + `airliftmsn/latestbycallsign/${callsign}`, { headers: authHeader() });
  // }

  findByParameters(data) {
    return axiosInstance.post(API_URL + `airliftmsn/msnreports`, data)
  }

  deleteMsn(id) {
    return axiosInstance.delete(API_URL + `airliftmsn/delete/${id}`);
  }
}

export default new MissionsService();