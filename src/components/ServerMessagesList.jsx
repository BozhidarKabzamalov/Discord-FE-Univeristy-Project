import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllServerMessages } from "../services/messagesService";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { useParams } from "react-router-dom";

const ServerMessagesList = () => {
    const { serverId } = useParams();
    const [serverMessages, setServerMessages] = useState([]);

    useEffect(() => {
        (async () => {
            if (!serverId) return;

            const serverMessages = await getAllServerMessages(serverId);

            setServerMessages(serverMessages);
        })();
    }, [serverId]);

    return (
        <StyledMessagesList>
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
        </StyledMessagesList>
    );
};

const StyledMessagesList = styled.div`
    flex: 1;
    background-color: #323338;
    min-height: 100vh;
    max-height: 100vh;
    padding: 20px;
    overflow-y: auto;
`;

const MessagesContainer = styled.div``;

export default ServerMessagesList;
