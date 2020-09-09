import http from "../http-common";

class MissionDataService {
    getAll() {
      return http.get("/missions");
    }
  
    get(id) {
      return http.get(`/missions/${id}`);
    }
  
    create(data) {
      return http.post("/missions", data);
    }
  
    update(id, data) {
      return http.patch(`/missions/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/missions/${id}`);
    }
  
    deleteAll() {
      return http.delete(`/missions`);
    }
    
    findByMissionNumber(msnNumber){
      return http.get(`/missions/msnNumber/${msnNumber}`);
    }

    findBySquadron(squadron){
      return http.get(`/missions/squadron/${squadron}`);
    }

    findByDateRange(data)
    {
      return http.post(`/missions/msnDate/`, data);
    }

    findByParameters(data)
    {
      return http.post(`/missions/msnSearch/`, data);
    }
  }
  
  export default new MissionDataService();