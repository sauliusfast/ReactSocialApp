import {useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import UserCard from "../components/UserCard";

const AllUsers = () => {
    const nav = useNavigate()
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user);

    if (!userLoggedIn) {
        nav('/');
        return false;
    }

    return (
        <Container>
            <h2>All users</h2>
            <Row>
                {allUsersState.users.map(x => <UserCard key={x.username} item={x}/>)}
            </Row>
        </Container>
    );
};

export default AllUsers;