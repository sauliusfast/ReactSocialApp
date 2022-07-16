import Card from 'react-bootstrap/Card';
import {useSelector} from "react-redux";
import {Badge} from "react-bootstrap";

const ConversationCard = ({sendMessageToUser, convertation}) => {
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user);
    const anotherUser = allUsersState.users.find(x => x.username === (userLoggedIn.username != convertation.sender ? convertation.sender : convertation.receiver));

    function sendMessage() {
        sendMessageToUser(anotherUser);
    }

    return (
        <Card className="mb-3 cursor-pointer" onClick={sendMessage}>
            <Card.Body>
                <img
                    src={anotherUser.image}
                    className="rounded-circle img-thumbnail me-2 float-start"
                    width="60"
                />
                <Card.Title><span className="text-muted">Conversation with</span> <strong>{anotherUser.username}</strong></Card.Title>
                <Badge bg="secondary">{convertation.datetime}</Badge>
            </Card.Body>
        </Card>
    );
};

export default ConversationCard;