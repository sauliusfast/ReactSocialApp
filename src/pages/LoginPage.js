import {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../features/currentUser";
import {Alert, Button, Container, Form} from "react-bootstrap";

const LoginPage = () => {
    const usernameRef = useRef()
    const passRef = useRef()

    const nav = useNavigate()
    const dis = useDispatch()

    const allUsers = useSelector(state => state.allUsers.value.users)
    const [error, setError] = useState(null)

    function loginUser() {
        const user = {
            username: usernameRef.current.value,
            password: passRef.current.value,
        }

        const userLoggedIn = allUsers.find(x => x.username === user.username && x.password === user.password)

        if(!userLoggedIn) return setError("bad credentials provided")

        dis(setCurrentUser(userLoggedIn.username))

        nav('/profile')
    }

    return (
        <Container>
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control ref={usernameRef} type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control ref={passRef} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={loginUser} variant="primary" type="button">Login</Button>
            </Form>
        </Container>
    );
};

export default LoginPage;