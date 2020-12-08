import authHeader from './auth-header';
import axios from 'axios';

const API_URL = '/private/'

class ParameterService{
      retrieveSquadrons(){
        return axios.get(API_URL + `datamg/squadrons`, { headers: authHeader() });
      }
      retrieveMsnTypes(){
        return axios.get(API_URL + `datamg/msntypes`, { headers: authHeader() });
      }
      retrieveOperations(){
        return axios.get(API_URL + `datamg/operations`, { headers: authHeader() });
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
      createSquadrons(data)
      {
        return axios.post(API_URL + `datamg/squadrons`, data, { headers: authHeader() });
      }
      createMsnTypes(data)
      {
        return axios.post(API_URL + `datamg/msntypes`, data, { headers: authHeader() });
      }
      createOperations(data)
      {
        return axios.post(API_URL + `datamg/operations`, data, { headers: authHeader() });
      }     
      createChannels(data)
      {
        return axios.post(API_URL + `datamg/channels`, data, { headers: authHeader() });
      }
      createBases(data)
      {
        return axios.post(API_URL + `datamg/bases`, data, { headers: authHeader() });
      }
      createAircraft(data)
      {
        return axios.post(API_URL + `datamg/aircraft`, data, { headers: authHeader() });
      }
      createICAO(data)
      {
        return axios.post(API_URL + `datamg/icao`, data, { headers: authHeader() });
      }  
      deactivateAircraft(aircraft, data)
      {
        return axios.patch(API_URL + `datamg/aircraft/status/${aircraft}`, data, { headers: authHeader() });
      }
      deactivateBases(base, data)
      {
        return axios.patch(API_URL + `datamg/bases/status/${base}`, data, { headers: authHeader() });
      }
      deactivateChannels(channel, data)
      {
        return axios.patch(API_URL + `datamg/channels/status/${channel}`, data, { headers: authHeader() });
      }   
      deactivateOperations(operation, data)
      {
        return axios.patch(API_URL + `datamg/operations/status/${operation}`, data, { headers: authHeader() });
      }
      deactivateMsnTypes(msntype, data)
      {
        return axios.patch(API_URL + `datamg/msntypes/status/${msntype}`, data, { headers: authHeader() });
      }
      deactivateICAO(icao, data)
      {
        return axios.patch(API_URL + `datamg/icao/status/${icao}`, data, { headers: authHeader() });
      }     
      deactivateSquadrons(squadron, data)
      {
        return axios.patch(API_URL + `datamg/squadrons/status/${squadron}`, data, { headers: authHeader() });
      }     
}
export default new ParameterService();