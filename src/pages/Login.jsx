import React, { Component } from 'react';
import propTypes from 'prop-types';
import logo from '../logo.svg';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonOffOn: true,
      name: '',
      loading: false,
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

  render() {
    const { name, buttonOffOn, loading } = this.state;

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
        <form
          className="container-xll d-flex flex-column
          shadow rounded  bg-dark bg-gradient p-4"
        >
          <img className="container-xll" src={ logo } alt="logo" />
          <FormLogin
            name={ name }
            buttonOffOn={ buttonOffOn }
            handleClick={ this.handleClick }
            handleChange={ this.handleChange }
          />
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  toggleLogin: propTypes.func.isRequired,
};

export default Login;
