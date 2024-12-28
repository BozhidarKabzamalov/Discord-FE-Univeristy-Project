import axiosInstance from "../axiosInstance"

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}