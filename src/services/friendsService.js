import axiosInstance from "../axiosInstance";

export const getAllFriendsForUser = async () => {
    try {
        const { data } = await axiosInstance.get("/friends");

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
