import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.requestFavoriteSongs();
  }

  requestFavoriteSongs = async () => {
    const songs = await getFavoriteSongs();
    this.setState({ loading: false, favoritesSongs: songs });
  }

  render() {
    const { loading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        <div className="container">
          { favoritesSongs.map((el) => (<MusicCard
            favoriteSongs={ favoritesSongs }
            key={ el.trackId }
            data={ el }
            forceRender="FavoritePage"
          />))}
        </div>
      </div>);
  }
}

export default Favorites;
