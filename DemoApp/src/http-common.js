import axios from "axios";

export default axios.create({
  baseURL: "https://sst-demo-app.herokuapp.com/"
});