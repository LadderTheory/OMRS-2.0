import axios from "axios";

export default axios.create({
  // baseURL for production, comment one out
  baseURL: "http://mm.sst.com/"
  // baseURL for dev 
  // baseURL: "http://localhost:4000"
});