import http from "../http-common";

class AdminDataService{
    getAll(){
        return http.get("/admins");
    }

    get(id)
    {
        return http.get(`/admins${id}`);
    }

    create(data)
    {
        return http.post("/admins", data);
    }

    update(id, data)
    {
        return http.patch(`/admins/${id}`, data);
    }

    delete(id)
    {
        return http.delete(`/admins/${id}`);
    }
}

export default new AdminDataService();