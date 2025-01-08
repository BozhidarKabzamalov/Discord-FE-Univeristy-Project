import { useState } from "react";
import styled from "styled-components";
import { sendMessage } from "../services/messagesService";

const MessageInput = ({ selectedServerId, serverMessages, setServerMessages }) => {
    const [message, setMessage] = useState("");

    const onSubmit = async () => {
        const payload = {
            content: message,
            senderId: 2,
            serverId: selectedServerId,
        }
    
        const response = await sendMessage(payload);
    
        setServerMessages([...serverMessages, response.data])
        setMessage("");
    };

    return (
        <>
            <Container onChange={(event) => setMessage(event.target.value)} />
            <div onClick={onSubmit}>Submit</div>
        </>
    );
};

const Container = styled.input`
    width: 100%;
    border-radius: 8px 0 0 8px;
    background-color: #383a40;
    border: none;
    color: #ffffff;
    outline: none;
    padding: 20px;
`;

export default MessageInput;
