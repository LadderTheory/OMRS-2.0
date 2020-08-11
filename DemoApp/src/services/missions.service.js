import http from "../http-common";

class MissionDataService {
    getAll() {
      return http.get("/missions");
    }
  
    get(msnNumber) {
      return http.get(`/missions/${msnNumber}`);
    }
  
    create(data) {
      return http.post("/missions", data);
    }
  
    update(msnNumber, data) {
      return http.put(`/missions/${msnNumber}`, data);
    }
  
    delete(msnNumber) {
      return http.delete(`/missions/${msnNumber}`);
    }
  
    deleteAll() {
      return http.delete(`/missions`);
    }
  }
  
  export default new MissionDataService();