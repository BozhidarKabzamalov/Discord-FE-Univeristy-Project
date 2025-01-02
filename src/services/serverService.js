import axiosInstance from "../axiosInstance";

export const getAllJoinedServers = async () => {
    try {
        const { data } = await axiosInstance.get("/servers");

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
