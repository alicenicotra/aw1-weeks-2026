import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router"

export function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = { username, password };
    await props.handleLogin(credentials);
  }

  return(
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control type="email" name="username" required value={username} onChange={(ev)=>setUsername(ev.target.value)}/>
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required value={password} onChange={(ev)=>setPassword(ev.target.value)}/>
          </Form.Group>
          <Button type="submit">Login</Button>
          <Link className="btn btn-danger mx-2 my-2" to={"/"}>Cancel</Link>
        </Form>
      </Col>
    </Row>
  );
}

export function LogoutButton(props) {
  return <Button variant="outline-light" onClick={props.logout}>Logout</Button>;
}