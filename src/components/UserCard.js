import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import {Col} from "react-bootstrap";

const UserCard = ({item}) => {
    const nav = useNavigate()

    return (
        <Col lg="3" sm="6">
            <Card onClick={() => nav('/users/'+item.username)}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.username}</Card.Title>
                    <Card.Text>{item.role}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default UserCard;