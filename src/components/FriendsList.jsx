import styled from "styled-components";
import { useEffect, useCallback } from "react";
import { getAllFriendsForUser } from "../services/friendsService";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store/slices/mainSlice";
import { useNavigate } from "react-router-dom";

const FriendsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.mainSlice.friends);

    const onPress = useCallback(
        (friendId) => {
            navigate(`/friend/${friendId}`);
        },
        [navigate]
    );

    useEffect(() => {
        (async () => {
            const friends = await getAllFriendsForUser();
            dispatch(setFriends(friends));
        })();
    }, [dispatch]);

    return (
        <Container>
            {friends &&
                friends.map(({ friendId, friendUsername }) => {
                    return (
                        <Friend
                            onClick={() => onPress(friendId)}
                            key={friendId}
                        >
                            {friendUsername}
                        </Friend>
                    );
                })}
        </Container>
    );
};

const Container = styled.div``;
const Friend = styled.p`
    color: #949ba4;
    font-weight: 600;
    margin-bottom: 20px;
`;

export default FriendsList;
