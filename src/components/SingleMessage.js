import {Container, Toast, ToastContainer} from "react-bootstrap";
import {useSelector} from "react-redux";

const SingleMessage = ({message}) => {
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const sender = allUsersState.users.find(x => x.username === message.sender)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user)

    return (
        <Container className={userLoggedIn.username !== message.sender ? 'd-flex justify-content-start' : 'd-flex justify-content-end' }>
            <Toast className="m-2">
                <Toast.Header closeButton={false}>
                    <img
                        src={sender.image}
                        className="rounded-circle img-thumbnail me-2"
                        width="40"
                    />
                    <strong className="me-auto">{message.sender}</strong>
                    <small>{message.datetime}</small>
                </Toast.Header>
                <Toast.Body>{message.message}</Toast.Body>
            </Toast>
        </Container>
    );
};

export default SingleMessage;