import styled from "styled-components";

const Message = ({ serverMessage }) => {
    const { id, senderUsername, content } = serverMessage;

    return (
        <StyledMessage key={id}>
            <Username>{senderUsername}</Username>
            <Content>{content}</Content>
        </StyledMessage>
    );
};

const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    color: #ffffff;
    margin-bottom: 20px;
`;

const Username = styled.div`
    color: #ffffff;
    margin-bottom: 5px;
`;

const Content = styled.div`
    color: #ffffff;
`;

export default Message;
