import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
        "User-Id": 2,
    }
});

export default axiosInstance;
