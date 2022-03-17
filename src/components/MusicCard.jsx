import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteValue: false,
      removeFavorite: false,
    };
  }

  componentDidMount() {
    const { data: { trackId }, favoriteSongs } = this.props;
    const song = favoriteSongs.find((el) => el.trackId === trackId);
    const isFavoriteTF = song !== undefined;
    this.setState({ favoriteValue: isFavoriteTF });
  }

  handleChange = async ({ target }) => {
    const { data, forceRender } = this.props;
    const value = target.checked;
    this.setState({
      loading: true,
      favoriteValue: value,
    });
    if (target.checked) {
      await addSong(data);
    } else {
      await removeSong(data);
    }
    this.setState({ loading: false });
    if (forceRender !== undefined) {
      this.setState({ removeFavorite: true });
    }
  }

  render() {
    const { data } = this.props;
    const { trackName, previewUrl, trackId } = data;
    const { loading, favoriteValue, removeFavorite } = this.state;
    if (removeFavorite) {
      return (<div />);
    }
    if (loading) {
      return (<Loading />);
    }
    return (
      <div className="container d-flex mb-1">
        <div className="container d-flex align-items-center">
          {' '}
          { trackName}
          {' '}
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="input-favorite">
          Favorita
          <input
            id="input-favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteValue }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
    trackId: propTypes.number,
  }).isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.object).isRequired,
  forceRender: propTypes.string.isRequired,
};
export default MusicCard;
