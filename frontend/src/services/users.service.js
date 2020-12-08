import axiosInstance from './auth-header';

const API_URL = '/private/'

//Service created for specific requests to the users collection within the database.
class UserService {
    getUsersList() {
      return axiosInstance.get(API_URL + `users`);
    }
  
    getUserByID(id) {
      return axiosInstance.get(API_URL + `users/${id}`);
    }
  
    updateUserInfo(id, data) {
      return axiosInstance.patch(API_URL + `users/${id}`, data);
    }
  
    deleteUser(id) {
      return axiosInstance.delete(API_URL + `users/${id}`);
    }

    makeAdmin(id) {
      return axiosInstance.get(API_URL + `users/admin/${id}`);
    }

    makeActive(id) {
      return axiosInstance.get(API_URL + `users/activate/${id}`);
    }

}
  export default new UserService();