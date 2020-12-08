import axiosInstance from './auth-header';

const API_URL = '/private/'

class ParameterService{
      retrieveSquadrons(){
        return axiosInstance.get(API_URL + `datamg/squadrons`);
      }
      retrieveMsnTypes(){
        return axiosInstance.get(API_URL + `datamg/msntypes`);
      }
      retrieveOperations(){
        return axiosInstance.get(API_URL + `datamg/operations`);
      }
      retrieveChannels(){
        return axiosInstance.get(API_URL + `datamg/channels`);
      }
      retrieveBases(){
        return axiosInstance.get(API_URL + `datamg/bases`);
      }
      retrieveAircraft(){
        return axiosInstance.get(API_URL + `datamg/aircraft`);
      }      
      retrieveICAOs(){
        return axiosInstance.get(API_URL + `datamg/icao`);
      }
      updateSquadrons(squadron,data)
      {
        return axiosInstance.patch(API_URL + `datamg/squadrons/${squadron}`, data);
      }
      updateMsnTypes(msntype,data)
      {
        return axiosInstance.patch(API_URL + `datamg/msntypes/${msntype}`, data);
      }
      updateOperations(operation,data)
      {
        return axiosInstance.patch(API_URL + `datamg/operations/${operation}`, data);
      }
      updateChannels(channel,data)
      {
        return axiosInstance.patch(API_URL + `datamg/channels/${channel}`, data);
      }
      updateBases(base,data)
      {
        return axiosInstance.patch(API_URL + `datamg/bases/${base}`, data);
      }
      updateAircraft(aircraft,data)
      {
        return axiosInstance.patch(API_URL + `datamg/aircraft/${aircraft}`, data);
      }
      updateICAO(icao,data)
      {
        return axiosInstance.patch(API_URL + `datamg/icao/${icao}`, data);
      }   
      deleteSquadrons(id)
      {
        return axiosInstance.delete(API_URL + `datamg/squadrons/${id}`);
      }
      deleteMsnTypes(id)
      {
        return axiosInstance.delete(API_URL + `datamg/msntypes/${id}`);
      }
      deleteOperations(id)
      {
        return axiosInstance.delete(API_URL + `datamg/operations/${id}`);
      }     
      deleteChannels(id)
      {
        return axiosInstance.delete(API_URL + `datamg/channels/${id}`);
      }
      deleteBases(id)
      {
        return axiosInstance.delete(API_URL + `datamg/bases/${id}`);
      }
      deleteAircraft(id)
      {
        return axiosInstance.delete(API_URL + `datamg/aircraft/${id}`);
      }
      deleteICAO(id)
      {
        return axiosInstance.delete(API_URL + `datamg/icao/${id}`);
      }   
      createSquadrons(data)
      {
        return axiosInstance.post(API_URL + `datamg/squadrons`, data);
      }
      createMsnTypes(data)
      {
        return axiosInstance.post(API_URL + `datamg/msntypes`, data);
      }
      createOperations(data)
      {
        return axiosInstance.post(API_URL + `datamg/operations`, data);
      }     
      createChannels(data)
      {
        return axiosInstance.post(API_URL + `datamg/channels`, data);
      }
      createBases(data)
      {
        return axiosInstance.post(API_URL + `datamg/bases`, data);
      }
      createAircraft(data)
      {
        return axiosInstance.post(API_URL + `datamg/aircraft`, data);
      }
      createICAO(data)
      {
        return axiosInstance.post(API_URL + `datamg/icao`, data);
      }  
      deactivateAircraft(aircraft, data)
      {
        return axiosInstance.patch(API_URL + `datamg/aircraft/status/${aircraft}`, data);
      }
      deactivateBases(base, data)
      {
        return axiosInstance.patch(API_URL + `datamg/bases/status/${base}`, data);
      }
      deactivateChannels(channel, data)
      {
        return axiosInstance.patch(API_URL + `datamg/channels/status/${channel}`, data);
      }   
      deactivateOperations(operation, data)
      {
        return axiosInstance.patch(API_URL + `datamg/operations/status/${operation}`, data);
      }
      deactivateMsnTypes(msntype, data)
      {
        return axiosInstance.patch(API_URL + `datamg/msntypes/status/${msntype}`, data);
      }
      deactivateICAO(icao, data)
      {
        return axiosInstance.patch(API_URL + `datamg/icao/status/${icao}`, data);
      }     
      deactivateSquadrons(squadron, data)
      {
        return axiosInstance.patch(API_URL + `datamg/squadrons/status/${squadron}`, data);
      }     
}
export default new ParameterService();