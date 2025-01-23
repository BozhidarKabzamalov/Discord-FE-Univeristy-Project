import { Routes, Route, useNavigate } from "react-router";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Home from "./views/Home.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import FriendMessagesList from "./components/FriendMessagesList.jsx";
import ServerMessagesList from "./components/ServerMessagesList.jsx";
import CreateServer from "./components/CreateServer.jsx";
import EditServer from "./components/EditServer.jsx";
import AddUserToServer from "./components/AddUserToServer.jsx";
import AddFriend from "./components/AddFriend.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAuthenticatedUserId,
    setIsAuthenticated,
} from "./store/slices/mainSlice.js";
import axiosInstance from "./axiosInstance.js";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(
        (state) => state.mainSlice.isAuthenticated
    );

    useEffect(() => {
        const persistedUserId = localStorage.getItem("userId");

        if (!persistedUserId || isAuthenticated) return;

        axiosInstance.defaults.headers.common["User-Id"] = persistedUserId;
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthenticatedUserId(persistedUserId));
        navigate("/");
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />}>
                    <Route
                        path="server/:serverId"
                        element={<ServerMessagesList />}
                    />
                    <Route path="server/create" element={<CreateServer />} />
                    <Route
                        path="server/edit/:serverId"
                        element={<EditServer />}
                    />
                    <Route
                        path="server/addUser/:serverId"
                        element={<AddUserToServer />}
                    />
                    <Route
                        path="friend/:friendId"
                        element={<FriendMessagesList />}
                    />
                    <Route path="friend/add" element={<AddFriend />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
