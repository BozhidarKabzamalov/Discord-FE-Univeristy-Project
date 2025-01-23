import { useState } from "react";
import styled from "styled-components";
import { sendFriendMessage } from "../services/messagesService";

const FriendMessageInput = ({
    selectedFriendId,
    friendMessages,
    setFriendMessages,
}) => {
    const [message, setMessage] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
    };

    const onSubmit = async () => {
        if (message.trim() === "") return;

        const payload = {
            content: message,
            senderId: 2,
            receiverId: selectedFriendId,
        };

        const { data } = await sendFriendMessage(payload);

        setFriendMessages([...friendMessages, data]);
        setMessage("");
    };

    return (
        <StyledMessageInput
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};

const StyledMessageInput = styled.input`
    width: 100%;
    border-radius: 8px 0 0 8px;
    background-color: #383a40;
    border: none;
    color: #ffffff;
    outline: none;
    padding: 20px;
`;

export default FriendMessageInput;
