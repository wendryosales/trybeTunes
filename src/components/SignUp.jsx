import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    const { buttonOffOn, handleChange, handleClick, name } = this.props;
    return (
      <>
        <div className="form-group">
          <label className="text-white text-opacity-75" htmlFor="email">
            Email address signup
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              data-testid="login-name-input"
              onChange={ handleChange }
              value={ name }
            />
            <small
              id="emailHelp"
              className="form-text text-muted"
            >
              Email that you have used while registration.
            </small>
          </label>
        </div>
        <div className="form-group">
          <label className="text-white text-opacity-75" htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label text-muted" htmlFor="remember">
            <input
              type="checkbox"
              name="checkbox"
              className="form-check-input"
              id="remember"
            />
            Remember me
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ buttonOffOn }
          onClick={ handleClick }
          className="btn btn-success bg-gradient float-right"
        >
          Login
        </button>
      </>
    );
  }
}
