import axiosInstance from "../axiosInstance";

export const getAllServerMessages = async (serverId) => {
    try {
        const { data } = await axiosInstance.get(
            `/servers/${serverId}/messages`
        );

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllFriendMessages = async (friendId) => {
    try {
        const { data } = await axiosInstance.get(
            `/friends/${friendId}/messages`
        );

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = async (payload) => {
    try {
        const { data } = await axiosInstance.post(`/servers/messages`, payload);
        
        return data;
    } catch (error) {
        console.log(error);
    }
};
