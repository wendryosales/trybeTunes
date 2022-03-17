import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: { },
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
          <input data-testid="edit-input-image" type="text" />
        </div>
        <div>
          <label htmlFor="inputName">
            <h3>Nome</h3>
            <input data-testid="edit-input-name" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="inputEmail">
            <h3>Email</h3>
            <input data-testid="edit-input-email" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="inputDescrição">
            <h3>Descrição</h3>
            <input data-testid="edit-input-description" type="text" />
          </label>
        </div>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        { !loading && card }
      </div>);
  }
}

export default ProfileEdit;
