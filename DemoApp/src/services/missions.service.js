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

    findBySquadron(squadron){
      return http.get(`/missions/squadron/${squadron}`);
    }

    findByDateRange(start, end)
    {
      return http.get(`(/missions/msnDate/%20%3E%3D%${start})%20AND%20(/missions/msnDate%20%3C%3D%${end})`);
    }
  }
  
  export default new MissionDataService();