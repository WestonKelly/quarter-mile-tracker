import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
});

export const userRegistration = async (email, password) => {
    let response = await api.post("users/signup/", {
        email: email,
        password: password,
    });
    if (response.status === 201) {
        let { user, token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return user;
    }
    alert(response.data);
    return null;
};

export const userLogIn = async (email, password) => {
    let response = await api.post("users/login/", {
        email: email,
        password: password,
    });
    if (response.status === 200) {
        let {user, token} = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        console.log(`user: ${user}, token: ${token}`)
        console.log(token)
        console.log(response.data)
        return user;
    }
    alert(response.data);
    return null;
};

export const userLogOut = async () => {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        return null;
    }
    alert("Something went wrong and logout failed");
};

export const userConfirmation = async () => {
    let token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        let response = await api.get("users/");
        if (response.status === 200) {
            console.log(response.data.user);
            return response.data.user;
        }
        delete api.defaults.headers.common["Authorization"];
    }
    return null;
};

export const getUserCars = async () => {
    try {
        let response = await api.get("cars/all/");
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
        alert(response.data);
        return [];
    } catch (e) {
        alert(e.message);
        return [];
    }
};

export const createCar = async (newCarData) => {
    try {
        let token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
        }

        const response = await api.post("cars/create/", newCarData);

        if (response.status === 201) {
            console.log(response.data);
            console.log(response.status)
            return response.data;
        } else {
            console.error('Failed to create car:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error creating car:', error.message);
        return null;
    }
};

export const deleteCar = async (carId) => {
    try {
        let response = await api.delete(`cars/delete/${carId}/`);
        if (response.status === 204) {
            return response.data;
        }
        alert(response.data);
        return null;
    } catch (e) {
        alert(e.message);
        return null;
    }
};

export const updateCar = async (carId, newCarData) => {
    try {
        let response = await api.put(`cars/update/${carId}/`, newCarData);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to edit car:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error editing car:', error.message);
        return null;
    }
};

export const generateTime = async (carId) => {
    try {
        let response = await api.post(`times/generate/${carId}/`);
        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Failed to generate time slip', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error generating time slip:', error.message);
        return null;
    }
};

export const getCarTimes = async (carId) => {
    try {
        let response = await api.get(`times/all/car/${carId}/`);
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
        alert(response.data);
        return [];
    } catch (e) {
        alert(e.message);
        return [];
    };
};

export const updateTimeSlip = async (time_slip_id, newTimeSlipData) => {
    try {
        let response = await api.put(`times/update/${time_slip_id}/`, newTimeSlipData);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to update time slip:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error editing time slip:', error.message);
        return null;
    }
};