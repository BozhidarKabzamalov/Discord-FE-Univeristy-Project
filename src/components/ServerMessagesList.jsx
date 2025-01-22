import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { getAllServerMessages } from "../services/messagesService";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteServer } from "../services/serverService";
import { setServers } from "../store/slices/mainSlice";

const ServerMessagesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [serverMessages, setServerMessages] = useState([]);
    const servers = useSelector((state) => state.mainSlice.servers);
    const server = useMemo(() => {
        return servers.find((server) => server.id == serverId);
    }, [serverId, servers]);

    const onDelete = async () => {
        await deleteServer(serverId);
        const serversCopy = [...servers];
        const updatedServers = serversCopy.filter((server) => {
            return server.id != serverId;
        })
        navigate('/')
        dispatch(setServers(updatedServers))
    }

    const onEdit = async () => {
        navigate(`/server/edit/${serverId}`)
    }

    const onAddUser = async () => {
        navigate(`/server/addUser/${serverId}`)
    }

    useEffect(() => {
        (async () => {
            if (!serverId) return;

            const serverMessages = await getAllServerMessages(serverId);

            setServerMessages(serverMessages);
        })();
    }, [serverId]);

    return (
        <Container>
            <Header>
                <ServerName>{server.name}</ServerName>
                <ServerActions>
                    <AddUser onClick={onAddUser}>Add User</AddUser>
                    <Edit onClick={onEdit}>Edit</Edit>
                    <Delete onClick={onDelete}>Delete</Delete>
                </ServerActions>
            </Header>
            <MessagesContainer>
                {serverMessages.map((serverMessage) => {
                    return (
                        <Message
                            key={serverMessage.id}
                            serverMessage={serverMessage}
                        />
                    );
                })}
            </MessagesContainer>
            <MessageInput
                selectedServerId={serverId}
                serverMessages={serverMessages}
                setServerMessages={setServerMessages}
            />
        </Container>
    );
};

const Container = styled.div`

    background-color: #323338;
    min-height: 100vh;
    max-height: 100vh;
    padding: 20px;
    overflow: auto;
`;

const Header = styled.div`
    display: flex;
    font-size: 28px;
    color: #a3a3a3;
    font-weight: 600;
    margin-bottom: 20px;
`;

const ServerName = styled.div``;

const ServerActions = styled.div`
    display: flex;
    margin-left: auto;
`;

const Edit = styled.div`
    margin-right: 10px;
`;

const Delete = styled.div`
    margin-left: 10px;
`;

const AddUser = styled.div`
    margin-right: 20px;
`

const MessagesContainer = styled.div`
    height: calc(100vh - 165px);
    max-height: calc(100vh - 165px);
    overflow: auto;
`;

export default ServerMessagesList;
