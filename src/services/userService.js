import axiosInstance from "../axiosInstance";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/users");
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (payload) => {
    try {
        await axiosInstance.post("/users", payload);
    } catch (error) {
        console.log(error);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const { data } = await axiosInstance.get(`/users/username/${username}`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
