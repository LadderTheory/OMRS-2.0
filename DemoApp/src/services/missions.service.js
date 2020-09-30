import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://mm.sst.com/private/';
const API_URL = 'http://localhost:4000/private/';

class MissionsService {
  getMissionsList() {
    return axios.get(API_URL + 'missions', { headers: authHeader() });
  }

  getMsnByID(id) {
      return axios.get(API_URL + `missions/${id}`, { headers: authHeader() });
  }

  updateMission(id, data) {
    return axios.patch(API_URL + `missions/${id}`, data, { headers: authHeader() })
  }

  addMission(data) {
    return axios.post(API_URL + `missions`, data, { headers: authHeader() })
  }

  deleteMission(id) {
    return axios.delete(API_URL + `missions/${id}`, { headers: authHeader() })
  }

  findByMsnNum(msnNum) {
    return axios.get(API_URL + `missions/msnNumber/${msnNum}`, { headers: authHeader() })
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

// import http from "../http-common";

// //Service created for specific requests to the missions collection within the database.
// class MissionDataService {
//     getAll() {
//       return http.get("/missions");
//     }
  
//     get(id) {
//       return http.get(`/missions/${id}`);
//     }
  
//     create(data) {
//       return http.post("/missions", data);
//     }
  
//     update(id, data) {
//       return http.patch(`/missions/${id}`, data);
//     }
  
//     delete(id) {
//       return http.delete(`/missions/${id}`);
//     }
  
//     deleteAll() {
//       return http.delete(`/missions`);
//     }
    
//     findByMissionNumber(msnNumber){
//       return http.get(`/missions/msnNumber/${msnNumber}`);
//     }

//     findBySquadron(squadron){
//       return http.get(`/missions/squadron/${squadron}`);
//     }

//     findByDateRange(data)
//     {
//       return http.post(`/missions/msnDate/`, data);
//     }

//     findByParameters(data)
//     {
//       return http.post(`/missions/msnSearch/`, data);
//     }
//   }
  
//   export default new MissionDataService();