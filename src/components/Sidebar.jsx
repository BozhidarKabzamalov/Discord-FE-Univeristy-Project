import { useState } from "react";
import ServersList from "./ServersList";
import FriendsList from "./FriendsList";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
    setAuthenticatedUserId,
    setIsAuthenticated,
} from "../store/slices/mainSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isServersSelected, setIsServersSelected] = useState(true);

    const logout = () => {
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthenticatedUserId(null));
        localStorage.removeItem("userId");
    };

    return (
        <StyledSidebar>
            <Container>
                <Text
                    onClick={() => {
                        setIsServersSelected(true);
                    }}
                >
                    Servers
                </Text>
                <Text
                    onClick={() => {
                        navigate("/server/create");
                    }}
                >
                    Create
                </Text>
            </Container>
            <Container>
                <Text
                    onClick={() => {
                        setIsServersSelected(false);
                    }}
                >
                    Friends
                </Text>
                <Text
                    onClick={() => {
                        navigate("/friend/add");
                    }}
                >
                    Add
                </Text>
            </Container>
            {isServersSelected ? <ServersList /> : <FriendsList />}
            <Logout onClick={logout}>Logout</Logout>
        </StyledSidebar>
    );
};

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2c2d31;
    width: 300px;
    height: 100vh;
    padding: 20px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const Text = styled.div`
    color: #949ba4;
    font-weight: 600;
    font-size: 20px;
`;

const Friends = styled.div`
    color: #949ba4;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 3px solid #1e1f22;
`;

const Logout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: auto;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    color: #ffffff;
    background-color: #5865f2;
`;

export default Sidebar;
