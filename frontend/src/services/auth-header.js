export default function authHeader() {
    const token = localStorage.getItem('token');
  
    if (token) {
      return { 'authorization': 'Bearer ' + token };   
    } else {
      return {};
    }
  }