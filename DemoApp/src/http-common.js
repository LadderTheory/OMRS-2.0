import axios from "axios";

export default axios.create({
  //baseURL for production, comment one out
  baseURL: "http://192.168.1.78:32080/"
  //baseURL for dev 
  //baseURL: "http://localhost:4000"
});