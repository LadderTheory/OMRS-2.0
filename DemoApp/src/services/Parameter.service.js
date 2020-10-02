import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/private/';
// 'http://mm.sst.com/private/';



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
      retrieveChannels(){
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


      updateSquadrons(squadron,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/squadrons/${squadron}`, data, { headers: authHeader() });
      }
      updateMsnTypes(msntype,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/msntypes/${msntype}`, data, { headers: authHeader() });
      }
      updateOperations(operation,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/operations/${operation}`, data, { headers: authHeader() });
      }
      updateLegTypes(legtype,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/legtypes/${legtype}`, data, { headers: authHeader() });
      }
      updateChannels(channel,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/channels/${channel}`, data, { headers: authHeader() });
      }
      updateBases(base,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/bases/${base}`, data, { headers: authHeader() });
      }
      updateAircraft(aircraft,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/aircraft/${aircraft}`, data, { headers: authHeader() });
      }
      updateICAO(icao,data)
      {
        // return http.patch(`/parameters/squadron/${squadron}`, data)
        return axios.patch(API_URL + `datamg/icao/${icao}`, data, { headers: authHeader() });
      }




      deleteSquadrons(squadron)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/squadrons/${squadron}`, { headers: authHeader() });
      }
      deleteMsnTypes(msntype)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/msntypes/${msntype}`, { headers: authHeader() });
      }
      deleteOperations(operation)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/operations/${operation}`, { headers: authHeader() });
      }
      deleteLegTypes(legtype)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/legtypes/${legtype}`, { headers: authHeader() });
      }
      deleteChannels(channel)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/channels/${channel}`, { headers: authHeader() });
      }
      deleteBases(base)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/bases/${base}`, { headers: authHeader() });
      }
      deleteAircraft(aircraft)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/aircraft/${aircraft}`, { headers: authHeader() });
      }
      deleteICAO(icao)
      {
        // return http.delete(`/parameters/squadron/${squadron}`)
        return axios.delete(API_URL + `datamg/icao/${icao}`, { headers: authHeader() });
      }
   


}

export default new AirliftMissionService();