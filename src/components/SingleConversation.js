import Card from 'react-bootstrap/Card';
import {Alert, Button, ButtonGroup, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {addConversation, deleteConversation as deleteConversationFromState} from "../features/conversations";
import moment from "moment";
import ConversationMessages from "./ConversationMessages";
import {useNavigate} from "react-router-dom";
import {addUserBlock} from "../features/blockedUsers";
import {deleteUserBlock} from "../features/blockedUsers";

const SingleConversation = ({sender, receiver}) => {
    const dis = useDispatch()
    const nav = useNavigate()
    const messageRef = useRef()
    const allMessagesState = useSelector(state => state.conversations.value)
    const allBlockedUsersState = useSelector(state => state.blockedUsers.value)
    const blockedUser = allBlockedUsersState.blockedUsers.find(x => x.blockedUser === sender.username && x.initiator === receiver.username);
    const blockInitiator = allBlockedUsersState.blockedUsers.find(x => x.blockedUser === receiver.username && x.initiator === sender.username);

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            sendMessage();
        }
    }

    function sendMessage() {
        const chatId = allMessagesState.conversations.filter(function (el) {
            return el.chat_id.indexOf(sender.username + "_" + receiver.username) > -1 || el.chat_id.indexOf(receiver.username + "_" + sender.username) > -1;
        }).map(function (conversation) {
            return conversation.sender + "_" + conversation.receiver;
        });

        const message = {
            sender: sender.username,
            receiver: receiver.username,
            message: messageRef.current.value,
            datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
            chat_id: (chatId.length ? chatId[0] : sender.username + "_" + receiver.username)
        }

        messageRef.current.value = '';

        dis(addConversation(message))
    }

    function deleteConversation() {
        const messages = allMessagesState.conversations.filter(function (el) {
            return el.chat_id.indexOf(sender.username + "_" +  receiver.username) > -1 ||
                el.chat_id.indexOf(receiver.username + "_" + sender.username) > -1;
        }).map(function (conversation) {
            return conversation;
        });

        dis(deleteConversationFromState({
            messages: messages
        }))

        nav('/conversations');
    }

    function blockUser() {
        const blockData = {
            initiator: sender.username,
            blockedUser: receiver.username
        }

        dis(addUserBlock(blockData))
    }

    function unblockUser() {
        const blockedUserIndex = allBlockedUsersState.blockedUsers.findIndex(x => x.blockedUser === receiver.username && x.initiator === sender.username)

        dis(deleteUserBlock({
            index: blockedUserIndex
        }))
    }

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col md={4}><span className="text-muted">Conversation with</span> <strong>{receiver.username}</strong></Col>
                    <Col md={{ span: 4, offset: 4 }} className="text-right">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="danger" size="sm" onClick={deleteConversation}>Delete</Button>
                            {!blockedUser && !blockInitiator ?
                            <Button variant="warning" size="sm" onClick={blockUser}>Block</Button>
                                : '' }
                            {blockInitiator ?
                                <Button variant="warning" size="sm" onClick={unblockUser}>Unblock</Button>
                            : '' }
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <ConversationMessages sender={sender} receiver={receiver} />
            </Card.Body>
            <Card.Footer>
                {!blockedUser && !blockInitiator ?
                    <InputGroup className="mb-3">
                    <Form.Control ref={messageRef}
                    placeholder="Text..."
                    onKeyPress={handleKeyPress}
                    />
                    <Button type="button" onClick={sendMessage} variant="info">Send</Button>
                    </InputGroup>
                : '' }
                {blockedUser ?
                    <Alert variant="danger">You are blocked by {receiver.username}</Alert>
                : '' }
                {blockInitiator ?
                    <Alert variant="warning">{receiver.username} is banned by you. <Alert.Link onClick={unblockUser} href="#">Unblock?</Alert.Link></Alert>
                : '' }
            </Card.Footer>
        </Card>
    );
};

export default SingleConversation;