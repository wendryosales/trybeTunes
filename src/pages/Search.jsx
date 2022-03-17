import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

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

  handleChange = ({ target }) => {
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
        <p className="libraries libraries-title">
          Resultado de álbuns de:
          {' '}
          { itemSearch }
        </p>

        <div className="libraries">
          {
            (albums.length > 1)
              ? albums.map((ele) => <Card dataAlbum={ ele } key={ ele.collectionId } />)
              : <div className="notfound">Nenhum álbum foi encontrado</div>
          }
        </div>
      </>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <form className="form-search d-flex justify-content-center">
          <div className="col-auto">
            <input
              data-testid="search-artist-input"
              className="form-control width-search"
              type="text"
              placeholder="Nome do Artista"
              value={ search }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-auto">
            <button
              data-testid="search-artist-button"
              type="button"
              className="btn btn-primary"
              disabled={ buttonOffOn }
              onClick={ this.handleClick }
            >
              Procurar
            </button>
          </div>
        </form>
        { loading && <Loading /> }
        { clickButton && libraries }
      </div>);
  }
}

export default Search;
