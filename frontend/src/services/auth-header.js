export default function authHeader() {
    const token = localStorage.getItem('token');
  //attaches the token that was sent back from the keycloak server to any http request from the frontend to the backend to ensure only authenticated requests can recieve data from the backend
    if (token) {
      return { 'authorization': 'Bearer ' + token };   
    } else {
      return {};
    }
  }