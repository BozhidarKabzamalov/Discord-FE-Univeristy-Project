import { useEffect } from "react";
import styled from "styled-components";
import { getAllUsers } from "../services/userService";

const Chat = () => {
    useEffect(() => {
        (async () => {
            const response = await getAllUsers();

            console.log(response);
        })();
    }, []);

    return <Container></Container>;
};

const Container = styled.div`
    flex: 1;
    background-color: #323338;
    min-height: 100vh;
`;

export default Chat;
