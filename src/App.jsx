import { Routes, Route } from "react-router";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Home from "./views/Home.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default App;
