import React, { Component } from 'react';
import propTypes from 'prop-types';
import logo from '../logo.svg';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';
import SignUp from '../components/SignUp';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonOffOn: true,
      name: '',
      loading: false,
      login: true,
    };
  }

  handleChange = ({ target }) => {
    const min = 3;
    const enableButton = target.value.length >= min;

    this.setState({
      buttonOffOn: !enableButton,
      name: target.value,
    });
  }

  handleClick = () => {
    const { toggleLogin } = this.props;
    const { name: username } = this.state;
    createUser({ name: username });
    this.setState({
      loading: true,
    });

    const time = 500;
    setTimeout(() => {
      this.setState({
        loading: false,
      }, toggleLogin(true));
    }, time);
  };

  handleClickLogin = () => {
    this.setState({ login: true });
  }

  handleClickSignUp = () => {
    this.setState({ login: false });
  }

  render() {
    const { name, buttonOffOn, loading, login } = this.state;
    const nav = 'btn w-50 text-white-50';
    const navActive = 'btn w-50 text-white-50 border-bottom border-3 ';

    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div
        className="d-flex flex-column
          align-items-center justify-content-center h-100 bg-success bg-gradient w-100"
        data-testid="page-login"
      >
        <img className="container-xll" src={ logo } alt="logo" />
        <form
          className="container-xll d-flex flex-column
          shadow rounded-5  bg-dark bg-gradient p-4"
        >
          <div className="container mb-3 nav">
            <button
              type="button"
              className={ login ? navActive : nav }
              onClick={ this.handleClickLogin }
            >
              Login
            </button>
            <button
              type="button"
              className={ login ? nav : navActive }
              onClick={ this.handleClickSignUp }
            >
              Sign Up
            </button>
          </div>
          {login ? <FormLogin
            name={ name }
            buttonOffOn={ buttonOffOn }
            handleClick={ this.handleClick }
            handleChange={ this.handleChange }
          /> : <SignUp
            name={ name }
            buttonOffOn={ buttonOffOn }
            handleClick={ this.handleClick }
            handleChange={ this.handleChange }
          />}

        </form>
      </div>

    );
  }
}

Login.propTypes = {
  toggleLogin: propTypes.func.isRequired,
};

export default Login;
