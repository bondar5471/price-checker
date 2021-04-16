import React from 'react';
import Routes from '../Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Account } from '../../lib/Accounts';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Account>
      <Router>
        <Routes />
      </Router>
    </Account>
  );
}
