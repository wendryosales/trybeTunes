import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
    this.setState({
      user: data,
      url: data.image,
      loading: false,
    });
  }

  render() {
    const { user, url, loading } = this.state;
    const urlImg = url === ''
      ? 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png'
      : url;

    if (loading) {
      return (
        <>
          <header className="header px-3">
            <Link to="/search">
              <img src={ logo } alt="logo" />
            </Link>
            <Loading />
            <Link to="/profile">
              <div className="userBox">
                <img className="avatar" src={ urlImg } alt="Avatar" />
                <h4 data-testid="header-user-name">{user.name}</h4>
              </div>
            </Link>
          </header>
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </nav>
        </>);
    }
    return (
      <>
        <header className="header px-3" data-testid="header-component">
          <Link to="/search">
            <img src={ logo } alt="logo" />
          </Link>
          <Link to="/profile">
            <div className="userBox">
              <img className="avatar" src={ urlImg } alt="Avatar" />
              <h4 data-testid="header-user-name">{ user.name }</h4>
            </div>
          </Link>
        </header>
        <nav>
          <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
          <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </nav>
      </>
    );
  }
}

export default Header;
