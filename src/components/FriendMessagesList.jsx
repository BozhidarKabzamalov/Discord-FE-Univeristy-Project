import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllFriendMessages } from "../services/messagesService";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { useParams } from "react-router-dom";

const FriendMessagesList = () => {
    const { friendId } = useParams();
    const [friendMessages, setFriendMessages] = useState([]);

    useEffect(() => {
        (async () => {
            if (!friendId) return;

            const friendMessages = await getAllFriendMessages(friendId);

            setFriendMessages(friendMessages);
        })();
    }, [friendId]);

    return (
        <StyledMessagesList>
            <MessagesContainer>
                {friendMessages.map((friendMessage) => {
                    return (
                        <Message
                            key={friendMessage.id}
                            serverMessage={friendMessage}
                        />
                    );
                })}
            </MessagesContainer>
            <MessageInput
                selectedServerId={friendId}
                serverMessages={friendMessages}
                setServerMessages={setFriendMessages}
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

export default FriendMessagesList;
