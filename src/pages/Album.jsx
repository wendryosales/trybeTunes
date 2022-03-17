import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      <div data-testid="page-album">
        <Header />
        <div className="xll-container d-flex justify-content-center">
          <div className="card card-400x400 container ">
            <img
              src={ url }
              alt={ collectionName }
              className="card-img-top"
            />
            <h6 data-testid="album-name" className="card-title">{collectionName}</h6>
            <p data-testid="artist-name" className="card-text">{artistName}</p>
          </div>
          <div className="sm-container tracklist">
            { tracks.map((el) => (<MusicCard
              favoriteSongs={ favoriteSongs }
              key={ el.trackId }
              data={ el }
              favoriteValue={ favoriteValue }
              forceRender={ this.forceRender }
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
