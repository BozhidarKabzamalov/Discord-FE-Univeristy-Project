import { useState } from "react";
import styled from "styled-components";
import { sendServerMessage } from "../services/messagesService";

const ServerMessageInput = ({
    selectedServerId,
    serverMessages,
    setServerMessages,
}) => {
    const [message, setMessage] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
    };

    const onSubmit = async () => {
        const payload = {
            content: message,
            senderId: 2,
            serverId: selectedServerId,
        };

        const { data } = await sendServerMessage(payload);

        setServerMessages([...serverMessages, data]);
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

export default ServerMessageInput;
