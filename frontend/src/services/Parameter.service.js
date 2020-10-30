import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/private/'

class ParameterService{
    getAll() {
        return axios.get(API_URL + `datamg`, { headers: authHeader() });
      }
      get(id) {
        return axios.get(API_URL + `datamg/findBy/${id}`, { headers: authHeader() });
      }
      create(data) {
        return axios.post(API_URL + `datamg`, data, { headers: authHeader() });
      }
      update(id, data) {
        return axios.patch(API_URL + `datamg/${id}`, data, { headers: authHeader() });
      }
      delete(id) {
        return axios.delete(API_URL + `datamg/${id}`, { headers: authHeader() });
      }
      deleteAll() {
        return axios.delete(API_URL + `datamg`, { headers: authHeader() });
      }


      retrieveSquadrons(){
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
      retrieveICAOs(){
        return axios.get(API_URL + `datamg/icao`, { headers: authHeader() });
      }


      updateSquadrons(squadron,data)
      {
        return axios.patch(API_URL + `datamg/squadrons/${squadron}`, data, { headers: authHeader() });
      }
      updateMsnTypes(msntype,data)
      {
        return axios.patch(API_URL + `datamg/msntypes/${msntype}`, data, { headers: authHeader() });
      }
      updateOperations(operation,data)
      {
        return axios.patch(API_URL + `datamg/operations/${operation}`, data, { headers: authHeader() });
      }
      updateLegTypes(legtype,data)
      {
        return axios.patch(API_URL + `datamg/legtypes/${legtype}`, data, { headers: authHeader() });
      }
      updateChannels(channel,data)
      {
        return axios.patch(API_URL + `datamg/channels/${channel}`, data, { headers: authHeader() });
      }
      updateBases(base,data)
      {
        return axios.patch(API_URL + `datamg/bases/${base}`, data, { headers: authHeader() });
      }
      updateAircraft(aircraft,data)
      {
        return axios.patch(API_URL + `datamg/aircraft/${aircraft}`, data, { headers: authHeader() });
      }
      updateICAO(icao,data)
      {
        return axios.patch(API_URL + `datamg/icao/${icao}`, data, { headers: authHeader() });
      }
      updateCommTypes(commtype, data){
        return axios.patch(API_URL + `datamg/commtypes/${commtype}`, data, { headers: authHeader() });
      }


   
      deleteSquadrons(id)
      {
        return axios.delete(API_URL + `datamg/squadrons/${id}`, { headers: authHeader() });
      }
      deleteMsnTypes(id)
      {
        return axios.delete(API_URL + `datamg/msntypes/${id}`, { headers: authHeader() });
      }
      deleteOperations(id)
      {
        return axios.delete(API_URL + `datamg/operations/${id}`, { headers: authHeader() });
      }
      deleteLegTypes(id)
      {
        return axios.delete(API_URL + `datamg/legtypes/${id}`, { headers: authHeader() });
      }
      deleteChannels(id)
      {
        return axios.delete(API_URL + `datamg/channels/${id}`, { headers: authHeader() });
      }
      deleteBases(id)
      {
        return axios.delete(API_URL + `datamg/bases/${id}`, { headers: authHeader() });
      }
      deleteAircraft(id)
      {
        return axios.delete(API_URL + `datamg/aircraft/${id}`, { headers: authHeader() });
      }
      deleteICAO(id)
      {
        return axios.delete(API_URL + `datamg/icao/${id}`, { headers: authHeader() });
      }
      deleteCommTypes(id)
      {
        return axios.delete(API_URL + `datamg/commtypes/${id}`, {headers:authHeader()});
      }


      createSquadrons(data)
      {
        return axios.post(API_URL + `datamg/squadrons`, data, {headers: authHeader()});
      }
      createMsnTypes(data)
      {
        return axios.post(API_URL + `datamg/msntypes`, data, {headers: authHeader()});
      }
      createOperations(data)
      {
        return axios.post(API_URL + `datamg/operations`, data, {headers: authHeader()});
      }
      createLegTypes(data)
      {
        return axios.post(API_URL + `datamg/legtypes`, data, {headers: authHeader()});
      }
      createChannels(data)
      {
        return axios.post(API_URL + `datamg/channels`, data, {headers: authHeader()});
      }
      createBases(data)
      {
        return axios.post(API_URL + `datamg/bases`, data, {headers: authHeader()});
      }
      createAircraft(data)
      {
        return axios.post(API_URL + `datamg/aircraft`, data, {headers: authHeader()});
      }
      createICAO(data)
      {
        return axios.post(API_URL + `datamg/icao`, data, {headers: authHeader()});
      }
      createCommTypes(data)
      {
        return axios.post(API_URL + `datamg/commtypes`, data, {headers: authHeader()});
      }
   
}
export default new ParameterService();