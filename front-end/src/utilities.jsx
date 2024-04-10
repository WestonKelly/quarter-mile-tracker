import { Axios } from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});

export const userRegistration = async (email, password) => {
    let response = await api.post("users/signup", {
        email: email,
        password: password,
    });
    if (response.status === 201) {
        let { user, token } = resoonse.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return user;
    }
    alert(response.data);
    return null;
};