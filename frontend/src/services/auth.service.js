import axios from "axios";

const API_URL = '/auth/'

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axios.post(API_URL + "signup", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getSquadrons() {
    return axios.get(API_URL + "squadrons");
  }
}

export default new AuthService();
