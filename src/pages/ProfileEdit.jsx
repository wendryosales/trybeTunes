import React, { Component } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: { },
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
      name: '',
      email: '',
      description: '',
      image: '',
      sessionActual: session,
    });
  }

  handleChange = ({ target }) => {
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
    if (target.name === 'description') {
      this.setState({
        description: target.value,
      });
    }
    if (target.name === 'image') {
      this.setState({
        image: target.value,
      });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { user, name, email, image, description } = this.state;
    localStorage.setItem('sessionActual', JSON.stringify({
      user, name, email, image, description,
    }));
  };

  render() {
    const { name, email, description, image } = this.state;
    const { loading, url, sessionActual } = this.state;
    const urlImg = url === 'undefined';
    const card = (
      <div
        className="container-xll d-flex flex-column
        shadow rounded-5 form-profile bg-dark bg-gradient p-4 mt-2"
      >
        <div className="container d-flex justify-content-center align-items-center mb-3">
          <div>
            {urlImg ? <BiUserCircle className="svg-perfil text-light" /> : <img
              data-testid="profile-image"
              className="image-perfil shadow rounded-circle"
              src={ sessionActual.image }
              alt="Foto de Perfil"
            /> }
          </div>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="inputName">
            <h3>Nome</h3>
            <input
              className="text-white form-control bg-secondary bg-opacity-50 border-0 mb-3"
              data-testid="edit-input-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              type="text"
              placeholder="Enter your full name"
            />
            <small
              className="form-text text-muted"
            >
              Fique à vontade para usar seu nome social
            </small>
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="inputEmail">
            <h3>Email</h3>
            <input
              className="text-white form-control bg-secondary bg-opacity-50 border-0 mb-3"
              data-testid="edit-input-email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              type="text"
              placeholder="Enter your email address"
            />
            <small
              className="form-text text-muted"
            >
              Escolha um e-mail que consulte diariamente
            </small>
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="inputDescrição">
            <h3>Descrição</h3>
            <input
              className="text-white form-control bg-secondary bg-opacity-50 border-0 mb-3"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              type="text"
              name="description"
              value={ description }
              placeholder="About me"
            />
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75" htmlFor="inputDescrição">
            <h3>Image</h3>
            <input
              className="text-white form-control bg-secondary bg-opacity-50 border-0 mb-3"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              type="text"
              name="image"
              value={ image }
              placeholder="Enter your image - URL LINK"
            />
          </label>
        </div>
        <Link className="d-flex justify-content-center" to="/profile/">
          <button
            className="btn btn-success bg-gradient ms-2"
            type="button"
            onClick={ this.handleClick }
          >
            Save
          </button>
        </Link>
      </div>
    );
    return (
      <div
        className="page-responsiv d-flex
        justify-content-between "
        data-testid="page-profile"
      >
        <NavBar />
        <div
          className="minH-responsiv container-fluid d-flex
          flex-column bg-dark bg-gradient"
        >
          <Header />
          <div className="d-flex justify-content-center">
            { loading && <Loading /> }
            { !loading && card }
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
