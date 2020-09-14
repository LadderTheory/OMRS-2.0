import http from "../http-common";

class ParameterDataService{

    getAll() {
        return http.get("/parameters");
      }
    
      get(id) {
        return http.get(`/parameters/${id}`);
      }
    
      create(data) {
        return http.post("/parameters", data);
      }
    
      update(id, data) {
        return http.patch(`/parameters/${id}`, data);
      }
    
      delete(id) {
        return http.delete(`/parameters/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/parameters`);
      }
      retrieveSquadron(){
        return http.get("/parameters/squadron");
      }

}

export default new ParameterDataService();
