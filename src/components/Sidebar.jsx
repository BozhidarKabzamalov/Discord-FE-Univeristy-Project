import { useState } from "react";
import ServersList from "./ServersList";
import FriendsList from "./FriendsList";
import styled from "styled-components";

const Sidebar = () => {
    const [isServersSelected, setIsServersSelected] = useState(true);

    return (
        <StyledSidebar>
            <Servers
                onClick={() => {
                    setIsServersSelected(true);
                }}
            >
                Servers
            </Servers>
            <Friends
                onClick={() => {
                    setIsServersSelected(false);
                }}
            >
                Friends
            </Friends>
            {isServersSelected ? <ServersList /> : <FriendsList />}
        </StyledSidebar>
    );
};

const StyledSidebar = styled.div`
    background-color: #2c2d31;
    width: 300px;
    height: 100vh;
    padding: 20px;
`;

const Servers = styled.div`
    color: #949ba4;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 30px;
`;

const Friends = styled.div`
    color: #949ba4;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 3px solid #1e1f22;
`;

export default Sidebar;
