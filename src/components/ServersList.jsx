import styled from "styled-components";
import { useEffect, useCallback } from "react";
import { getAllJoinedServers } from "../services/serverService";
import { useDispatch, useSelector } from "react-redux";
import { setServers } from "../store/slices/mainSlice";
import { useNavigate } from "react-router-dom";

const ServersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const servers = useSelector((state) => state.mainSlice.servers);

    const onPress = useCallback(
        (serverId) => {
            navigate(`/server/${serverId}`);
        },
        [navigate]
    );

    useEffect(() => {
        (async () => {
            const servers = await getAllJoinedServers();
            dispatch(setServers(servers));
        })();
    }, [dispatch]);

    return (
        <Container>
            {servers &&
                servers.map(({ id, name }) => {
                    return (
                        <Server onClick={() => onPress(id)} key={id}>
                            {name}
                        </Server>
                    );
                })}
        </Container>
    );
};

const Container = styled.div``;
const Server = styled.p`
    color: #949ba4;
    font-weight: 600;
    margin-bottom: 20px;
`;

export default ServersList;
