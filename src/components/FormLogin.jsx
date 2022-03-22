import propTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getUser } from '../services/userAPI';

export default class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonOffOn: true,
    };
  }

  notify = () => {
    const { email } = this.state;
    if (email.length > 1) {
      toast.success('Check your email', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Please enter a valid email address', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleChange = ({ target }) => {
    const { email } = this.state;
    const val = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/; // Regex de validação
    if (target.name === 'email') {
      this.setState({
        email: target.value,
      });
    }

    if (target.name === 'password') {
      this.setState({
        password: target.value,
      });
    }

    if (email.match(val)) {
      this.setState({
        buttonOffOn: false,
      });
    } else { this.setState({ buttonOffOn: true }); }
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { initialSession } = this.props;
    const { email, password } = this.state;
    const response = await getUser();
    const autentication = response.dataUsers
      .some((el) => el.email === email && el.password === password);
    localStorage.setItem('sessionActual', JSON.stringify({ email }));
    if (autentication) {
      initialSession(true);
      toast.success('Successful login', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('User not found', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  render() {
    const { buttonOffOn, email, password } = this.state;
    return (
      <>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="email">
            Email address
            <input
              type="email"
              name="email"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ email }
            />
            <small
              id="emailHelp"
              className="form-text text-muted"
            >
              Email that you have used while registration.
            </small>
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="password">
            Password
            <input
              type="password"
              autoComplete="on"
              name="password"
              className="text-white form-control bg-secondary bg-opacity-50 border-0"
              id="password"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
        </div>
        <div className="form-check mb-2">
          <label className="form-check-label text-muted" htmlFor="remember">
            <input
              type="checkbox"
              name="checkbox"
              className="form-check-input bg-secondary bg-opacity-50 border-0"
              id="remember"
            />
            Remember me
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ buttonOffOn }
          className="btn btn-success bg-gradient float-right mb-2"
          onClick={ this.handleClick }
        >
          Login
        </button>
        <div className="text-center">
          <a
            className="text-secondary"
            data-bs-toggle="modal"
            href="#forgot_password"
            onClick={ this.notify }
          >
            Forgot password
          </a>
        </div>
      </>
    );
  }
}

FormLogin.propTypes = {
  initialSession: propTypes.func.isRequired,
};
