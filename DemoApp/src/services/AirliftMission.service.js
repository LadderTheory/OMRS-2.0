import axios from 'axios';
import authHeader from './auth-header';
//import API_URL from './api_url'

const API_URL = "http://mm.sst.com/auth/";
//const API_URL = 'http://localhost:4000/private/';

class AirliftMissionService{
    getAll() {
        // return http.get("/parameters");
        return axios.get(API_URL + `datamg`, { headers: authHeader() });
      }
      get(id) {
        // return http.get(`/parameters/${id}`);
        return axios.get(API_URL + `datamg/findBy/${id}`, { headers: authHeader() });
      }
      create(data) {
        // return http.post("/parameters", data);
        return axios.post(API_URL + `datamg`, data, { headers: authHeader() });
      }
      update(id, data) {
        // return http.patch(`/parameters/${id}`, data);
        return axios.patch(API_URL + `datamg/${id}`, data, { headers: authHeader() });
      }
      delete(id) {
        // return http.delete(`/parameters/${id}`);
        return axios.delete(API_URL + `datamg/${id}`, { headers: authHeader() });
      }
      deleteAll() {
        // return http.delete(`/parameters`);
        return axios.delete(API_URL + `datamg`, { headers: authHeader() });
      }
      retrieveSquadrons(){
        // return http.get("/parameters/squadron");
        return axios.get(API_URL + `datamg/squadrons`, { headers: authHeader() });
      }
      retrieveMsnTypes(){
        return axios.get(API_URL + `datamg/msntypes`, { headers: authHeader() });
      }
      retrieveOperations(){
        return axios.get(API_URL + `datamg/operations`, { headers: authHeader() });
      }
      retrieveLegTypes(){
        return axios.get(API_URL + `datamg/legtypes`, { headers: authHeader() });
      }
      getChannels(){
        return axios.get(API_URL + `datamg/channels`, { headers: authHeader() });
      }
      retrieveBases(){
        return axios.get(API_URL + `datamg/bases`, { headers: authHeader() });
      }
      retrieveAircraft(){
        return axios.get(API_URL + `datamg/aircraft`, { headers: authHeader() });
      }
      retrieveCommTypes(){
        return axios.get(API_URL + `datamg/commtypes`, { headers: authHeader() });
      }
      retrieveICAO(){
        return axios.get(API_URL + `datamg/icao`, { headers: authHeader() });
      }

}

export default new AirliftMissionService();