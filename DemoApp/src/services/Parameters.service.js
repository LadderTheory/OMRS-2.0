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
      retrieveAirframe(){
        return http.get("/parameters/airframe");
      }
      retrieveLocation(){
        return http.get("/parameters/location");
      }
      deleteSquadron(squadron)
      {
        return http.delete(`/parameters/squadron/${squadron}`)
      }
      deleteAirframe(airframe)
      {
        return http.delete(`/parameters/airframe/${airframe}`)
      }
      deleteLocation(location)
      {
        return http.delete(`/parameters/location/${location}`)
      }
      updateSquadron(squadron,data)
      {
        return http.patch(`/parameters/squadron/${squadron}`, data)
      }
      updateAirframe(airframe,data)
      {
        return http.patch(`/parameters/airframe/${airframe}`, data)
      }
      updateLocation(location,data)
      {
        return http.patch(`/parameters/location/${location}`, data)
      }
}

export default new ParameterDataService();
