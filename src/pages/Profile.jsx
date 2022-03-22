import React, { Component } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import { getUser } from '../services/userAPI';

class Profile extends Component {
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
      sessionActual: session,
    });
  }

  render() {
    const { loading, user, url, sessionActual } = this.state;
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
          <label className="text-white text-opacity-75 w-100" htmlFor="inputName">
            <h3>Nome</h3>
            <p
              className="text-white form-control
             bg-secondary bg-opacity-50 border-0 mb-3"
            >
              {sessionActual.name !== undefined ? sessionActual.name
                : user.name}
            </p>
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75 w-100" htmlFor="inputEmail">
            <h3>Email</h3>
            <p
              className="text-white form-control
              bg-secondary bg-opacity-50 border-0 mb-3"
            >
              {sessionActual.email !== undefined ? sessionActual.email
                : user.email}
            </p>
          </label>
        </div>
        <div className="form-group mb-2">
          <label className="text-white text-opacity-75 w-100" htmlFor="inputDescrição">
            <h3>Descrição</h3>
            <div
              className="text-white form-control
              bg-secondary bg-opacity-50 border-0 mb-3"
            >
              {sessionActual.description !== undefined ? sessionActual.description
                : 'vazio'}
            </div>
          </label>
        </div>
        <Link className="d-flex justify-content-center" to="/profile/edit">
          <button
            className="btn btn-success bg-gradient ms-2"
            type="button"
          >
            Editar perfil
          </button>
        </Link>
      </div>
    );
    return (
      <div
        className="page-responsiv d-flex
        justify-content-between"
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
      </div>);
  }
}

export default Profile;
