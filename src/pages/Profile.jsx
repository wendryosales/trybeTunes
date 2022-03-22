import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { name: 'usuario',
        email: 'usuario@usuario.com',
        image: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
        description: 'vazio' },
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, loading: false });
    console.log(user);
  }

  render() {
    const { loading, user } = this.state;
    let userDefault = user;
    if (user.image === '') {
      userDefault = { name: user.name,
        email: `${user.name}@mail.com`,
        image: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
        description: 'vazio',
      };
    }
    const card = (
      <div>
        <div>
          <img
            data-testid="profile-image"
            src={ userDefault.image }
            alt="Foto de Perfil"
          />
          <Link to="/profile/edit">
            <button type="button">Editar perfil</button>
          </Link>
        </div>
        <div>
          <label htmlFor="inputName">
            <h3>Nome</h3>
            <p>{userDefault.name}</p>
          </label>
        </div>
        <div>
          <label htmlFor="inputEmail">
            <h3>Email</h3>
            <p>{userDefault.email}</p>
          </label>
        </div>
        <div>
          <label htmlFor="inputDescrição">
            <h3>Descrição</h3>
            <p>{userDefault.description}</p>
          </label>
        </div>
      </div>
    );
    return (
      <div className="d-flex justify-content-between" data-testid="page-profile">
        <NavBar />
        <div
          className="container-fluid d-flex
          flex-column bg-dark bg-gradient"
        >
          <Header />
          { loading && <Loading /> }
          { !loading && card }
        </div>
      </div>);
  }
}

export default Profile;
