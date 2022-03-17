import React, { Component } from 'react';
import propTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import logo from '../logo.svg';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';
import SignUp from '../components/SignUp';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonOffOn: true,
      name: '',
      email: '',
      passsword: '',
      loading: false,
      login: true,
    };
  }

  handleChange = ({ target }) => {
    const min = 3;
    const enableButton = target.value.length >= min;
    const val = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    if (target.name === 'name') {
      this.setState({
        name: target.value,
      });
    }

    if (target.value === val) {
      console.log('deu certo');
    }
    if (target.name === 'email') {
      this.setState({
        email: target.value,
      });
    }
  }

  handleClickSubmit = () => {
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
    const { name, buttonOffOn, loading, login, email } = this.state;
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
          shadow rounded-5  bg-dark bg-gradient p-4 mt-2"
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
            email={ email }
            buttonOffOn={ buttonOffOn }
            handleClick={ this.handleClickSubmit }
            handleChange={ this.handleChange }
          />}
        </form>
        <ToastContainer
          position="top-right"
          autoClose={ 5000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}

Login.propTypes = {
  toggleLogin: propTypes.func.isRequired,
};

export default Login;
