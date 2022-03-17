import propTypes from 'prop-types';
import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    const { buttonOffOn, handleChange, handleClick, name, email } = this.props;
    return (
      <>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="name">
            Full Name
            <input
              type="text"
              name="name"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="name"
              placeholder="Enter your full name"
              data-testid="login-name-input"
              onChange={ handleChange }
              value={ name }
            />
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="email">
            Email address
            <input
              type="email"
              name="email"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="email"
              placeholder="Enter your email address"
              data-testid="login-name-input"
              onChange={ handleChange }
              value={ email }
            />
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="password"
              placeholder="Password"
            />
          </label>
        </div>
        <div className="form-group mb-3">
          <label className="text-white text-opacity-75" htmlFor="retype-password">
            Retype Password
            <input
              type="password"
              name="password"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="retype-password"
              placeholder="Retype Password"
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ buttonOffOn }
          onClick={ handleClick }
          className="btn btn-success bg-gradient float-right"
        >
          Submit
        </button>
      </>
    );
  }
}

SignUp.propTypes = {
  buttonOffOn: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  handleClick: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};
