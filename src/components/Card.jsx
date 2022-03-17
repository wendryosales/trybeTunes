import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { dataAlbum } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = dataAlbum;
    const url200x200 = artworkUrl100.replace('100x100', '200x200');
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="card">
          <img
            src={ url200x200 }
            alt={ collectionName }
            className="card-img-top"
          />
          <h6 className="card-title">{collectionName}</h6>
          <p className="card-text">{artistName}</p>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  dataAlbum: propTypes.PropTypes.exact({
    artistName: propTypes.string,
    collectionName: propTypes.string,
    artworkUrl100: propTypes.string,
    artistId: propTypes.number,
    collectionId: propTypes.number,
    collectionPrice: propTypes.number,
    releaseDate: propTypes.string,
    trackCount: propTypes.number,
  }).isRequired,
};

export default Card;
