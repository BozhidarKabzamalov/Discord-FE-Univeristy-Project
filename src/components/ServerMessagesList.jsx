import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { getAllServerMessages } from "../services/messagesService";
import ServerMessageInput from "./ServerMessageInput";
import Message from "./Message";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteServer,
    getAllServerMembers,
    promoteUserToAdmin,
} from "../services/serverService";
import { setServers } from "../store/slices/mainSlice";

const ServerMessagesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [serverMessages, setServerMessages] = useState([]);
    const [serverMembers, setServerMembers] = useState([]);
    const servers = useSelector((state) => state.mainSlice.servers);
    const server = useMemo(() => {
        if (!servers) return;

        return servers.find((server) => server.id == serverId);
    }, [serverId, servers]);
    const authenticatedUserId = useSelector(
        (state) => state.mainSlice.authenticatedUserId
    );

    const currentUserRole = useMemo(() => {
        const currentUser = serverMembers.find((serverMember) => {
            return serverMember.userId == authenticatedUserId;
        });

        return currentUser?.role;
    }, [authenticatedUserId, serverMembers]);

    const isOwner = useMemo(() => {
        return currentUserRole === "owner";
    }, [currentUserRole]);

    const isAdmin = useMemo(() => {
        return currentUserRole === "admin";
    }, [currentUserRole]);

    const isOwnerOrAdmin = useMemo(() => {
        return isOwner || isAdmin;
    }, [isAdmin, isOwner]);

    const onDelete = async () => {
        await deleteServer(serverId);
        const serversCopy = [...servers];
        const updatedServers = serversCopy.filter((server) => {
            return server.id != serverId;
        });
        navigate("/");
        dispatch(setServers(updatedServers));
    };

    const onEdit = async () => {
        navigate(`/server/edit/${serverId}`);
    };

    const onAddUser = async () => {
        navigate(`/server/addUser/${serverId}`);
    };

    const onPromote = async (memberId) => {
        await promoteUserToAdmin(serverId, memberId);
        const updatedServerMembers = serverMembers.map((serverMember) =>
            serverMember.userId == memberId
                ? { ...serverMember, role: "admin" }
                : serverMember
        );

        setServerMembers(updatedServerMembers);
    };

    useEffect(() => {
        (async () => {
            if (!serverId) return;

            const serverMessages = await getAllServerMessages(serverId);
            const serverMembers = await getAllServerMembers(serverId);

            setServerMessages(serverMessages);
            setServerMembers(serverMembers);
        })();
    }, [serverId]);

    return (
        <Container>
            <ColumnsContainer>
                <LeftColumn>
                    <Header>
                        <ServerName>{server.name}</ServerName>
                        <ServerActions>
                            {isOwnerOrAdmin && (
                                <AddUser onClick={onAddUser}>Add User</AddUser>
                            )}
                            {isOwner && (
                                <>
                                    <Edit onClick={onEdit}>Edit</Edit>
                                    <Delete onClick={onDelete}>Delete</Delete>
                                </>
                            )}
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
                    <ServerMessageInput
                        selectedServerId={serverId}
                        serverMessages={serverMessages}
                        setServerMessages={setServerMessages}
                    />
                </LeftColumn>
                <RightColumn>
                    <ServerMembers>
                        <Header>Members</Header>
                        {serverMembers.map((serverMember) => {
                            const isServerMemberGuest =
                                serverMember.role === "guest";
                            return (
                                <ServerMember key={serverMember.id}>
                                    {serverMember.username}
                                    {isServerMemberGuest && isOwner && (
                                        <Promote
                                            onClick={() =>
                                                onPromote(serverMember.userId)
                                            }
                                        >
                                            Promote
                                        </Promote>
                                    )}
                                </ServerMember>
                            );
                        })}
                    </ServerMembers>
                </RightColumn>
            </ColumnsContainer>
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
`;

const MessagesContainer = styled.div`
    height: calc(100vh - 165px);
    max-height: calc(100vh - 165px);
    overflow: auto;
`;

const ColumnsContainer = styled.div`
    display: flex;
`;

const LeftColumn = styled.div`
    flex: 1;
`;

const RightColumn = styled.div`
    flex-basis: 250px;
    padding-left: 20px;
`;

const ServerMembers = styled.div`
    display: flex;
    flex-direction: column;
`;

const ServerMember = styled.div`
    display: flex;
    color: #949ba4;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Promote = styled.div`
    color: #949ba4;
    font-weight: 600;
    margin-bottom: 20px;
    margin-left: 20px;
`;

export default ServerMessagesList;
