import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';
import NavBar from '../components/NavBar';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonOffOn: true,
      search: '',
      loading: false,
      albums: [{}],
      clickButton: false,
    };
  }

  handleEnter = (event) => {
    const enter = 13;
    if (event.keyCode === enter) {
      event.preventDefault();
      this.handleClick();
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    const min = 2;
    const enableButton = target.value.length >= min;
    this.setState({
      buttonOffOn: !enableButton,
      search: target.value,
    });
  }

  handleClick = async () => {
    const { search } = this.state;
    const itemSearch = search;
    this.setState({
      loading: true,
      search: '',
      itemSearch,
    });
    const data = await searchAlbumsAPI(itemSearch);
    this.setState({ albums: data, loading: false, clickButton: true });
  }

  render() {
    const {
      itemSearch,
      search,
      buttonOffOn,
      loading,
      albums,
      clickButton,
    } = this.state;

    const libraries = (
      <>
        <p className="p-4 text-light">
          Resultado de álbuns de:
          {' '}
          { itemSearch }
        </p>

        <div className="d-flex flex-row flex-wrap p-2">
          {
            (albums.length > 1)
              ? albums.map((ele) => <Card dataAlbum={ ele } key={ ele.collectionId } />)
              : <div className="p-4 text-light">Nenhum álbum foi encontrado</div>
          }
        </div>
      </>
    );

    return (
      <div
        data-testid="page-search"
        className="d-flex justify-content-between"
      >
        <NavBar />
        <div className="container-fluid d-flex flex-column bg-dark bg-gradient">
          <Header />
          <form className="container-md form-search d-flex justify-content-center">
            <div
              className="form-search container-sm me-3"
            >
              <input
                data-testid="search-artist-input"
                className="text-white form-control
                bg-secondary bg-opacity-50 border-0 me-3"
                type="text"
                placeholder="Nome do Artista"
                value={ search }
                onChange={ this.handleChange }
                onKeyDown={ this.handleEnter }
              />
            </div>
            <button
              data-testid="search-artist-button"
              type="button"
              className="btn btn-success"
              disabled={ buttonOffOn }
              onClick={ this.handleClick }
            >
              Procurar
            </button>
          </form>
          { loading && <Loading /> }
          { clickButton && libraries }
        </div>
      </div>
    );
  }
}

export default Search;
