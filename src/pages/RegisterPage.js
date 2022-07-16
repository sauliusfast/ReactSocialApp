import {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../features/allUsers";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {usernameValidation} from "../validation/username";
import {passwordValidation} from "../validation/password";

const RegisterPage = () => {
    const usernameRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()
    const roleRef = useRef()
    const allUsers = useSelector(state => state.allUsers.value.users)

    const nav = useNavigate()
    const dis = useDispatch()

    const [error, setError] = useState(null)
    const [role, setRole] = useState(null)

    function changeRole(e) {
        setRole(e.currentTarget.value)
    }

    function registerUser() {
        const user = {
            username: usernameRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value,
            role: role
        }

        if (validation(user, allUsers)) return setError(validation(user, allUsers))

        dis(addUser(user))
        nav('/')
    }

    function validation(user, allUsers) {
        const usernameValidationError = usernameValidation(user.username);
        const passwordValidationError = passwordValidation(user.passOne, user.passTwo);

        if (allUsers.find(x => x.username === user.username)) {
            return "user already exists";
        }

        if (!user.role) {
            return "please check role";
        }

        if (usernameValidationError) {
            return usernameValidationError;
        }

        if (passwordValidationError) {
            return passwordValidationError;
        }
    }

    return (
        <Container>
            <h2>Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control ref={usernameRef} type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control ref={passOneRef} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control ref={passTwoRef} type="password" placeholder="Repeat password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>

                    <Form.Check
                        ref={roleRef}
                        type="radio"
                        name="role"
                        value="admin"
                        label="Admin"
                        onClick={changeRole}
                    />

                    <Form.Check
                        ref={roleRef}
                        type="radio"
                        name="role"
                        value="regular"
                        label="Regular"
                        onClick={changeRole}
                    />
                </Form.Group>

                <Button onClick={registerUser} variant="primary" type="button">Register</Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;