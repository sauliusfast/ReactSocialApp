import {useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import UserCard from "../components/UserCard";
import ConversationCard from "../components/ConversationCard";
import {useEffect, useState} from "react";
import SingleConversation from "../components/SingleConversation";

const Conversations = () => {
    const nav = useNavigate()
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const allConversationsState = useSelector(state => state.conversations.value)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user);
    const [selectedUser, sendMessage] = useState(null);

    const location = useLocation();

    useEffect(() => {
        sendMessage(null);
    }, [location]);

    if (!userLoggedIn) {
        nav('/');
        return false;
    }

    const conversations = {};

    allConversationsState.conversations.filter(function (el) {
        return el.chat_id.indexOf(userLoggedIn.username + "_" + el.sender) > -1 ||
            el.chat_id.indexOf(userLoggedIn.username + "_" + el.receiver) > -1 ||
            el.chat_id.indexOf(el.receiver + "_" + userLoggedIn.username) > -1 ||
            el.chat_id.indexOf(el.sender + "_" + userLoggedIn.username) > -1;
    }).map(function (conversation) {
        conversations[conversation.chat_id] = conversation;
        return conversation;
    });

    const conversationsList = Object.keys(conversations)
        .map(function(key) {
            return conversations[key];
        });

    function sendMessageToUser(selectedUser) {
        sendMessage(selectedUser);
    }

    return (
        <Container>
            <h2>Conversations</h2>
            {!selectedUser ?
                <Row>
                    {conversationsList.map(x => <ConversationCard key={x.datetime} sendMessageToUser={sendMessageToUser} convertation={x}/>)}
                </Row>
            : <SingleConversation sender={userLoggedIn} receiver={selectedUser} /> }
        </Container>
    );
};

export default Conversations;