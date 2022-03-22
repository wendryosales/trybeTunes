import React, { Component } from 'react';
import propTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import logo from '../logo.svg';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';
import SignUp from '../components/SignUp';
import 'react-toastify/dist/ReactToastify.min.css';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      login: true,
    };
  }

  componentDidMount() {
    const fibonnaci = '011235813';
    createUser({
      name: 'Dr. Sheldon Lee Cooper',
      email: 'mail@mail.com',
      password: fibonnaci,
    });
  }

  handleClickLogin = () => {
    this.setState({ login: true });
  }

  handleClickSignUp = () => {
    this.setState({ login: false });
  }

  render() {
    const { initialSession } = this.props;
    const { loading, login } = this.state;
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
          align-items-center justify-content-center h-100
          bg-success bg-gradient w-100 page-login"
        data-testid="page-login"
      >
        <img className="container-xll" src={ logo } alt="logo" />
        <form
          className="container-xll d-flex flex-column
          shadow rounded-5  bg-dark bg-gradient p-4 mt-2"
          method="post"
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
          {login ? <FormLogin initialSession={ initialSession } /> : <SignUp
            handleClickLogin={ this.handleClickLogin }
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
  initialSession: propTypes.func.isRequired,
};

export default Login;
