import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BiSearch, BiUser, BiHeart } from 'react-icons/bi';

export default class NavBar extends Component {
  render() {
    return (
      <div
        className="navbar bg-transparent nav
        d-flex align-items-start justify-content-center text-secondary p-3"
      >
        <nav
          className="
           d-flex flex-column justify-content-between align-items-center"
        >
          <NavLink
            className="link-secondary container mb-1 p-2
              d-flex justify-content-start align-items-center"
            to="/profile"
            data-testid="link-to-profile"
          >
            <BiUser className="me-2" />
            Perfil
          </NavLink>
          <NavLink
            className="link-secondary container mb-1 p-2
              d-flex justify-content-start align-items-center"
            to="/search"
            data-testid="link-to-search"
          >
            <BiSearch className="me-2" />
            Pesquisa
          </NavLink>
          <NavLink
            className="link-secondary container mb-1 p-2
              d-flex justify-content-start align-items-center"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <BiHeart className="me-2" />
            Favoritas
          </NavLink>
        </nav>
      </div>
    );
  }
}
