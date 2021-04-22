import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { AccountContext } from '../../lib/Accounts';

import './styles.css';

function SignIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { authenticate } = useContext(AccountContext);

  const userLogIn = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        const token = data.accessToken.jwtToken;
        localStorage.setItem('token', token);
        history.push('/home-page');
      })
      .catch((err) => {
        setError(err.message);
        if (err.code === 'UserNotConfirmedException') {
          history.push(`/verify/${email}`);
        }
      });
  };
  return (
    <Container>
      <Card className="login-form">
        <Card.Body>
          <Card.Title>
            <h1>Log In</h1>
          </Card.Title>
          <Form onSubmit={userLogIn}>
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
                  Log in
                </Button>
              </Col>
              <Col sm={2}>
                <Link to="sign-up">Sign Up</Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default withRouter(SignIn);

SignIn.propTypes = {
  history: PropTypes.object,
};
