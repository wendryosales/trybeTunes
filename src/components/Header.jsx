import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { getUser } from '../services/userAPI';
import logo from '../logoWhite.svg';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      url: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await getUser();
    const session = localStorage.getItem('sessionActual');
    const userActual = data.dataUsers.find((el) => el.email === session);
    this.setState({
      user: userActual,
      url: userActual.image,
      loading: false,
    });
  }

  render() {
    const { user, url, loading } = this.state;
    const urlImg = url === undefined;
    const perfilLoading = (
      <Link className="link-secondary" to="/profile">
        <div
          className="userBox d-flex justify-content-between align-items-center
          bg-black bg-gradient rounded-pill p-2"
        >
          <BiUserCircle className="svg-icon-user" />
          <h6 data-testid="header-user-name">User</h6>
        </div>
      </Link>);
    const perfilReady = (
      <Link
        className="link-secondary"
        to="/profile"
      >
        <div
          className="userBox d-flex justify-content-between align-items-center
        bg-black bg-gradient rounded-pill p-2"
        >
          { urlImg ? <BiUserCircle className="svg-icon-user" /> : <img
            className="avatar"
            src={ urlImg }
            alt="Avatar"
          /> }
          <h6 data-testid="header-user-name">{ user.name }</h6>
        </div>
      </Link>);
    /*       ? 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png'
      : url; */
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
