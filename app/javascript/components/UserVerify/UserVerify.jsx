import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useParams } from 'react-router-dom';
import UserPool from '../../lib/UserPool';

import './styles.css';

export default function UserVerify({ history }) {
  const { email } = useParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const redirectToLogin = (message) => {
    if (message === 'User cannot be confirmed. Current status is CONFIRMED') {
      history.push('/');
    }
  };

  const userVerify = (event) => {
    event.preventDefault();
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    user.confirmRegistration(code, false, (err, data) => {
      if (err) {
        setError(err.message);
        redirectToLogin(err.message);
      } else {
        if (data === 'SUCCESS') history.push('/');
      }
    });
  };

  const sendCodeAgain = () => {
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    user.resendConfirmationCode((err, data) => {
      if (err) setError(err.message);
      if (data) setShowMessage(true);
    });
  };
  return (
    <Container>
      <Card className="login-form">
        <Card.Body>
          <Card.Title>
            <h1>Enter verification code sent to your email: {email}</h1>
          </Card.Title>
          <Form onSubmit={userVerify}>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control autoComplete="off" required onChange={(e) => setCode(e.target.value)} />
            </Form.Group>
            {error ? <Form.Text className="error-message">{error}</Form.Text> : null}
            <Row>
              <Col sm={6}>
                <Button variant="primary" type="submit" block>
                  Verify account
                </Button>
              </Col>
              <Col sm={6}>
                <Button variant="link" onClick={sendCodeAgain} disabled={showMessage}>
                  Send verification code again
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Alert
        className="email-alert"
        show={showMessage}
        onClose={() => setShowMessage(false)}
        dismissible
        variant="primary"
      >
        Check your email to verify!
      </Alert>
    </Container>
  );
}

UserVerify.propTypes = {
  history: PropTypes.object,
};
