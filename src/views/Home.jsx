import ServerList from "../components/ServerList.jsx";
import Chat from "../components/Chat.jsx";
import styled from "styled-components";

const Home = () => {
    return (
        <Container>
            <ServerList />
            <Chat />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    min-height: 100vh;
`;

export default Home;
