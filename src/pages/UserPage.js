import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteUser as deleteUserFromState} from "../features/allUsers";
import {useState} from "react";
import SingleConversation from "../components/SingleConversation";

const UserPage = () => {
    const {username} = useParams();
    const nav = useNavigate()
    const dis = useDispatch()
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const selectedUser = allUsersState.users.find(x => x.username === username)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user)
    const [isMessage, sendMessage] = useState(null);

    function deleteUser() {
        const userIndex = allUsersState.users.findIndex(x => x.username === selectedUser.username)

        dis(deleteUserFromState({
            index: userIndex
        }))

        nav('/users');
    }

    if (!userLoggedIn) {
        nav('/');
        return false;
    }

    function sendMessageToUser() {
        sendMessage(1);
    }

    return (
        <Container>
            {!isMessage ?
            <Row>
                <Col lg="4">
                    <Card>
                        <Card.Img variant="top" src={selectedUser.image} />
                        {userLoggedIn.role === "admin" && userLoggedIn.username !== selectedUser.username ?
                            <Card.Body className="d-grid">
                                <Button onClick={deleteUser} variant="danger" type="button" size="lg">Delete user</Button>
                            </Card.Body>
                            : '' }
                    </Card>
                </Col>
                <Col>
                    <h3>{selectedUser.username}</h3>
                    <h4>{selectedUser.role}</h4>
                    {userLoggedIn.username !== selectedUser.username ?
                        <Button onClick={sendMessageToUser} variant="info" type="button" size="lg">Send message</Button>
                        : '' }
                </Col>
            </Row>
                : <SingleConversation sender={userLoggedIn} receiver={selectedUser} /> }
        </Container>
    );
};

export default UserPage;