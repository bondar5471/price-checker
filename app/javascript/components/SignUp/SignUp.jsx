import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserPool from '../../lib/UserPool';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SignUp({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const userSignUp = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError(err.message);
      } else {
        history.push(`/verify/${data.user.username}`);
      }
    });
  };
  return (
    <Container>
      <Card className="login-form">
        <Card.Body>
          <Card.Title>
            <h1>Sign Up</h1>
          </Card.Title>
          <Form onSubmit={userSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                aria-describedby="passwordHelpBlock"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers.
              </Form.Text>
            </Form.Group>
            {error ? <Form.Text className="error-message">{error}</Form.Text> : null}
            <Row>
              <Col sm={10}>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Col>
              <Col sm={2}>
                <Link to="/">Log In</Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

SignUp.propTypes = {
  history: PropTypes.object,
};
