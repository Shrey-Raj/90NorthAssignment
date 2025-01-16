import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const signup = async (username, email, password) => {
    const response = await axios
        .post(API_URL + "/signup/", {
            username,
            email,
            password,
        });
    if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (username, password) => {
    const response = await axios
        .post(API_URL + "/login/", {
            username,
            password,
        });
    if (response.data.access) {
        // console.log("Data is here?", response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;