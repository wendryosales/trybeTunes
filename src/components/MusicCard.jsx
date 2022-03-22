import React, { Component } from 'react';
import propTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
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
    if (forceRender === 'FavoritePage') {
      this.setState({ removeFavorite: true });
    }
  }

  render() {
    const { data, id } = this.props;
    const { trackName, previewUrl, trackId } = data;
    const { loading, favoriteValue, removeFavorite } = this.state;
    if (removeFavorite) {
      return (<div />);
    }
    if (loading) {
      return (<Loading />);
    }
    return (
      <div className="container d-flex mb-2 music-item">
        <div className="container text-light d-flex align-items-center">
          {' '}
          { trackName}
          {' '}
        </div>
        <ReactPlayer
          url={ previewUrl }
          controls
          height="50px"
          playing
          light
          pip
          stopOnUnmount={ false }
        />
        <label
          className="label-check d-flex
        align-items-center text-light"
          htmlFor={ id }
        >
          {favoriteValue ? <BsHeartFill /> : <BsHeart />}
          <input
            id={ id }
            className="bg-transparent check-fav"
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
  forceRender: propTypes.func,
  id: propTypes.number.isRequired,
};

MusicCard.defaultProps = {
  forceRender: '',
};

export default MusicCard;
