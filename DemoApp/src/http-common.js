import axios from "axios";

//baseURL for production
export default axios.create({
  baseURL: "http://192.168.1.78:32080/"
});