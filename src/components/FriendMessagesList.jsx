import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAllFriendMessages } from "../services/messagesService";
import FriendMessageInput from "./FriendMessageInput";
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
            <FriendMessageInput
                selectedFriendId={friendId}
                friendMessages={friendMessages}
                setFriendMessages={setFriendMessages}
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
    overflow: auto;
`;

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100vh - 95px);
    max-height: calc(100vh - 95px);
    overflow: auto;
`;

export default FriendMessagesList;
