import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/private/';

class ParameterDataService{

    getAll() {
        // return http.get("/parameters");
        return axios.get(API_URL + `parameters`, { headers: authHeader() });
      }
      get(id) {
        // return http.get(`/parameters/${id}`);
        return axios.get(API_URL + `parameters/findBy/${id}`, { headers: authHeader() });
      }
      create(data) {
        // return http.post("/parameters", data);
        return axios.post(API_URL + `parameters`, data, { headers: authHeader() });
      }
      update(id, data) {
        // return http.patch(`/parameters/${id}`, data);
        return axios.patch(API_URL + `parameters/${id}`, data, { headers: authHeader() });
      }
      delete(id) {
        // return http.delete(`/parameters/${id}`);
        return axios.delete(API_URL + `parameters/${id}`, { headers: authHeader() });
      }
      deleteAll() {
        // return http.delete(`/parameters`);
        return axios.delete(API_URL + `parameters`, { headers: authHeader() });
      }
      retrieveSquadron(){
        // return http.get("/parameters/squadron");
        return axios.get(API_URL + `parameters/squadron`, { headers: authHeader() });
      }
      retrieveAirframe(){
        // return http.get("/parameters/airframe");
        return axios.get(API_URL + `parameters/airframe`, { headers: authHeader() });
      }
      retrieveLocation(){
        // return http.get("/parameters/location");
        return axios.get(API_URL + `parameters/location`, { headers: authHeader() });
      }
      deleteSquadron(squadron)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `/parameters/squadron/${squadron}`, { headers: authHeader() });
      }
      deleteAirframe(airframe)
      {
        // return http.delete(`/parameters/airframe/${airframe}`)
        return axios.delete(API_URL + `/parameters/airframe/${airframe}`, { headers: authHeader() });
      }
      deleteLocation(location)
      {
        // return http.delete(`/parameters/location/${location}`)
        return axios.delete(API_URL + `/parameters/location/${location}`, { headers: authHeader() });
      }
      updateSquadron(squadron,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `/parameters/squadron/${squadron}`, { headers: authHeader() });
      }
      updateAirframe(airframe,data)
      {
        // return http.patch(`/parameters/airframe/${airframe}`, data)
        return axios.patch(API_URL + `/parameters/airframe/${airframe}`, data, { headers: authHeader() });
      }
      updateLocation(location,data)
      {
        // return http.patch(`/parameters/location/${location}`, data)
        return axios.patch(API_URL + `/parameters/location/${location}`, data, { headers: authHeader() });
      }
}

export default new ParameterDataService();
