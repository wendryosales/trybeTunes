import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import NavBar from '../components/NavBar';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [{ 0: { artistName: '', collectionName: '', artworkUrl100: '100x100' } }],
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const favoriteSong = await getFavoriteSongs();
    const { match: { params: { id } } } = this.props;
    getMusics(`${id}`)
      .then((music) => this.setState({
        musics: music,
        favoriteSongs: favoriteSong }));
  }

  render() {
    const { musics, favoriteValue, favoriteSongs } = this.state;
    const { artistName, collectionName, artworkUrl100 } = musics[0];
    const tracks = musics.filter((track) => track.trackName !== undefined);
    let url;
    if (artworkUrl100 !== undefined) {
      url = artworkUrl100.replace('100x100', '400x400');
    }
    return (
      <div className="d-flex justify-content-between" data-testid="page-album">
        <NavBar />
        <div
          className="container-fluid d-flex
          flex-column bg-dark bg-gradient"
        >
          <Header />
          <div
            className="container card-400x400 d-flex
              justify-content-start m-2 p-5 text-black align-items-end"
          >
            <img
              src={ url }
              alt={ collectionName }
              className="card-img-top"
            />
            <div className="d-flex flex-column container">
              <h1
                data-testid="album-name"
                className="card-title fs-1"
              >
                {collectionName}
              </h1>
              <h3 data-testid="artist-name" className="card-text fs-6">{artistName}</h3>
            </div>
          </div>
          <div className="container tracklist">
            { tracks.map((el) => (<MusicCard
              favoriteSongs={ favoriteSongs }
              key={ el.trackId }
              id={ el.trackId }
              data={ el }
              favoriteValue={ favoriteValue }
            />))}
          </div>
          <div />
        </div>
      </div>);
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
