import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import {useSelector} from "react-redux";
import ProfilePage from "../pages/ProfilePage";
import AllUsers from "../pages/AllUsers";
import UserPage from "../pages/UserPage";
import Conversations from "../pages/Conversations";
import {conversationsFilter} from "../features/conversationsFilter";

const Toolbar = () => {
    const allConversationsState = useSelector(state => state.conversations.value)
    const currentUser = useSelector(state => state.currentUser.value.user)

    const conversationsCount = conversationsFilter(allConversationsState, currentUser);

    return (
    <BrowserRouter>
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand>Social App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!currentUser ?
                            <div className="d-flex">
                                <Link className="nav-link" to="/">Login</Link>
                                <Link className="nav-link" to="/register">Register</Link>
                            </div> :

                            <div className="d-flex">
                                <Link className="nav-link" to="/profile">Profile</Link>
                                <Link className="nav-link" to="/users">All users</Link>
                                <Link className="nav-link" to="/conversations">Conversations {conversationsCount.length ? <Badge bg="secondary">{conversationsCount.length}</Badge> : ''}</Link>
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/users" element={<AllUsers/>}/>
            <Route path="/users/:username" element={<UserPage/>}/>
            <Route path="/conversations" element={<Conversations/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default Toolbar;