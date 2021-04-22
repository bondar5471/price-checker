import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

export default function Home({ history }) {
  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>PriceChecker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">Features</Nav.Link>
        <Nav.Link href="#">Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <Button variant="outline-info" onClick={logOut}>
          Log Out
        </Button>
      </Form>
    </Navbar>
  );
}

Home.propTypes = {
  history: PropTypes.object,
};
