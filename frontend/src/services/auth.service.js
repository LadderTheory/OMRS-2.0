//gets the currently logged in user from local storage
class AuthService {
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();