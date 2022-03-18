import propTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../services/userAPI';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      buttonOffOn: true,
      name: '',
      email: '',
      password: '',
      retypePassword: '',
    };
  }

  handleChange = ({ target }) => {
    const { email, name } = this.state;
    const val = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/; // Regex de validação de email
    const empty = name.length > 1;
    if (target.name === 'name') {
      this.setState({
        name: target.value,
      });
    }
    if (target.name === 'email') {
      this.setState({
        email: target.value,
      });
    }
    if (target.name === 'new-password') {
      this.setState({
        password: target.value,
      });
    }
    if (target.name === 'retypePassword') {
      this.setState({
        retypePassword: target.value,
      });
    }
    if (email.match(val) && empty) {
      this.setState({
        buttonOffOn: false,
      });
    } else { this.setState({ buttonOffOn: true }); }
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
    const { handleClickLogin } = this.props;
    const { name: username, email: ema, password: pass, retypePassword } = this.state;
    if (retypePassword === pass) {
      createUser({ name: username, email: ema, password: pass });
      handleClickLogin();
      toast.success('Successful registration', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn('Complete all the fields correctly', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const { name, email, buttonOffOn, password, retypePassword } = this.state;
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
              onChange={ this.handleChange }
              value={ name }
              required="required"
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
              onChange={ this.handleChange }
              value={ email }
              required="required"
            />
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="password">
            Password
            <input
              type="password"
              name="new-password"
              autoComplete="on"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="password"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ password }
              required="required"
            />
          </label>
        </div>
        <div className="form-group mb-3">
          <label className="text-white text-opacity-75" htmlFor="retypePassword">
            Retype Password
            <input
              type="password"
              name="retypePassword"
              autoComplete="on"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="retypePassword"
              placeholder="Retype Password"
              onChange={ this.handleChange }
              value={ retypePassword }
              required="required"
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ buttonOffOn }
          onClick={ this.handleClickSubmit }
          className="btn btn-success bg-gradient float-right"
        >
          Submit
        </button>
      </>
    );
  }
}

SignUp.propTypes = {
  handleClickLogin: propTypes.func.isRequired,
};
