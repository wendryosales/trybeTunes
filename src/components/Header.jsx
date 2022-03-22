import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { getUser } from '../services/userAPI';
import logo from '../logoWhite.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      url: '',
      loading: true,
      sessionActual: {},
    };
  }

  async componentDidMount() {
    const data = await getUser();
    const session = JSON.parse(localStorage.getItem('sessionActual'));
    const userActual = data.dataUsers.find((el) => el.email === session.email);
    this.setState({
      user: userActual,
      url: session.image === undefined ? 'undefined' : session.image,
      loading: false,
    });
  }

  render() {
    const { user, url, loading, sessionActual } = this.state;
    const urlImg = url === 'undefined';
    const perfilLoading = (
      <Link
        className="link-secondary userBox d-flex
        justify-content-around align-items-center
        bg-black bg-gradient rounded-pill p-2"
        to="/profile"
      >
        <BiUserCircle className="svg-icon-user" />
        User
      </Link>);
    const perfilReady = (
      <Link
        className="link-secondary userBox d-flex
        justify-content-around align-items-center
        bg-black bg-gradient rounded-pill p-2"
        to="/profile"
      >
        { urlImg ? <BiUserCircle className="svg-icon-user" /> : <img
          className="avatar"
          src={ urlImg }
          alt="Avatar"
        /> }
        <div className="w-75">
          <div className="text-user-header">
            {sessionActual.name !== undefined ? sessionActual.name
              : user.name}
          </div>
        </div>
      </Link>);
    return (
      <header
        className="header px-3 d-flex
      justify-content-between align-items-center"
        data-testid="header-component"
      >
        <Link to="/search">
          <img src={ logo } alt="logo" />
        </Link>
        {
          loading ? perfilLoading : perfilReady
        }
      </header>
    );
  }
}

export default Header;
