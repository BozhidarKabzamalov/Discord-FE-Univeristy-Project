import { useState } from "react";
import styled from "styled-components";
import { addUserToServer } from "../services/serverService";
import { useDispatch, useSelector } from "react-redux";
import { setServers } from "../store/slices/mainSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/userService";

const AddUserToServer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serverId } = useParams();
    const [username, setUsername] = useState('');
    const servers = useSelector((state) => state.mainSlice.servers);

    const onChange = (e) => {
        setUsername(e.target.value);
    };

    const onSubmit = async () => {
        const user = await getUserByUsername(username);
        await addUserToServer(serverId, user.id)
        navigate(`/server/${serverId}`)
    }

    return (
        <Container>
            <FormContainer>
                <Title>Add User To Server</Title>
                <InputContainer>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </InputContainer>
                <RegisterButton onClick={onSubmit}>Continue</RegisterButton>
            </FormContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #323338;
    min-height: 100vh;
    max-height: 100vh;
`;

const FormContainer = styled.div`
    background-color: #36393f;
    padding: 40px;
    width: 500px;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    color: #ffffff;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 20px;
`;

const Label = styled.label`
    color: #8e9297;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase;
`;

const Input = styled.input`
    font-size: 16px;
    height: 40px;
    padding: 10px;
    color: #dcddde;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.5);
    }

    &:focus {
        outline: 1px solid #7289da;
    }
`;

const RegisterButton = styled.button`
    cursor: pointer;
    font-weight: 500;
    color: #ffffff;
    background-color: #7289da;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 40px;
    border-radius: 3px;
    outline: none;
    border: none;
    margin-bottom: 20px;

    &:hover {
        background-color: #677bc4;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export default AddUserToServer;