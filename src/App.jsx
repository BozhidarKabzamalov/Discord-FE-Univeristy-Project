import { Routes, Route } from "react-router";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Home from "./views/Home.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import FriendMessagesList from "./components/FriendMessagesList.jsx";
import ServerMessagesList from "./components/ServerMessagesList.jsx";

const App = () => {
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
                    <Route
                        path="friend/:friendId"
                        element={<FriendMessagesList />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
