import http from "../http-common";

//Service created for specific requests to the users collection within the database.
class UserDataService {
    getAll() {
      return http.get("/users");
    }
  
    get(id) {
      return http.get(`/users/${id}`);
    }
  
    create(data) {
      return http.post("/users", data);
    }
  
    update(id, data) {
      return http.patch(`/users/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/users/${id}`);
    }

    findbyusername(username) {
      return http.get(`/users/userName/${username}`);
    }
}
  export default new UserDataService();