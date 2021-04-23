import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="wrapper">
          <div className="paper">
            <img className={'avatar'} alt="Error img" src="https://image.flaticon.com/icons/png/512/3273/3273666.png" />
            <h5>Price checker</h5>
          </div>
          <h2 className="head">OOOPS!</h2>
          <h4 className="message">Sorry, something went wrong.</h4>
          <div />
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
