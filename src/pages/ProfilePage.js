import {useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {updateUser} from "../features/allUsers";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {passwordValidation} from "../validation/password";

const ProfilePage = () => {
    const nav = useNavigate()
    const dis = useDispatch()
    const photoRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()
    const currentUserState = useSelector(state => state.currentUser.value)
    const allUsersState = useSelector(state => state.allUsers.value)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const userLoggedIn = allUsersState.users.find(x => x.username === currentUserState.user);

    if (!userLoggedIn) {
        nav('/');
        return false;
    }

    function changePhoto() {
        const imageUrl = photoRef.current.value;

        if (imageUrl) {
            setError(null);
            setSuccess("photo updated");
            const userIndex = allUsersState.users.findIndex(x => x.username === userLoggedIn.username)

            let userUpdated = {...userLoggedIn}
            userUpdated.image = imageUrl
            photoRef.current.value = '';

            dis(updateUser({
                index: userIndex,
                current: userUpdated
            }))
        } else {
            setSuccess(null);
            setError("please fill photo url");
        }
    }

    function changePassword() {
        const passOneValue = passOneRef.current.value;
        const passTwoValue = passTwoRef.current.value;
        const validationError = passwordValidation(passOneValue, passTwoValue);

        if (!validationError) {
            setError(null);
            setSuccess("password changed to " + passOneValue);
            passOneRef.current.value = '';
            passTwoRef.current.value = '';
            const userIndex = allUsersState.users.findIndex(x => x.username === userLoggedIn.username)

            let userUpdated = {...userLoggedIn}
            userUpdated.password = passOneValue

            dis(updateUser({
                index: userIndex,
                current: userUpdated
            }))
        } else {
            setSuccess(null);
            setError(validationError);
        }
    }

    return (
        <Container>
            <h2>Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Row>
                <Col lg="4">
                    <Card>
                        <Card.Img variant="top" src={userLoggedIn.image} />
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Control ref={photoRef} type="text" placeholder="photo url" />
                            </Form.Group>
                            <Button onClick={changePhoto} variant="primary" type="button">Change photo</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <h3>{userLoggedIn.username}</h3>
                    <h4>{userLoggedIn.role}</h4>

                    <Form className="mt-3 pt-3 border-top">
                        <Form.Label>Change password</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Control ref={passOneRef} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control ref={passTwoRef} type="password" placeholder="Repeat password" />
                        </Form.Group>

                        <Button onClick={changePassword} variant="primary" type="button">Change</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;