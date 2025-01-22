import axiosInstance from "../axiosInstance";

export const getAllFriendsForUser = async () => {
    try {
        const { data } = await axiosInstance.get("/friends");

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const addFriend = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/friendships", payload);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
