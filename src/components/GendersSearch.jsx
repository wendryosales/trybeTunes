import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';

class GendersSearch extends Component {
  constructor() {
    super();
    this.state = {
      pop: [],
      reggae: [],
      rock: [],
    };
  }

  async componentDidMount() {
    const pop = await searchAlbumsAPI('Olivia Rodrigo');
    const reggae = await searchAlbumsAPI('Dua Lipa');
    const rock = await searchAlbumsAPI('Bon Jovi');
    const top5 = 5;
    this.setState({
      pop: pop.slice(0, top5),
      reggae: reggae.slice(0, top5),
      rock: rock.slice(0, top5),
    });
  }

  render() {
    const { pop, reggae, rock } = this.state;
    return (
      <>
        <p className="p-4 text-light">Ouça: Olivia Rodrigo</p>
        <div className="d-flex flex-row flex-wrap p-2">
          { pop.map((el) => <Card dataAlbum={ el } key={ el.collectionId } />)}
        </div>
        <p className="p-4 text-light">Ouça: Bon Jovi</p>
        <div className="d-flex flex-row flex-wrap p-2">
          { rock.map((el) => <Card dataAlbum={ el } key={ el.collectionId } />)}
        </div>
        <p className="p-4 text-light">Ouça: Dua Lipa</p>
        <div className="d-flex flex-row flex-wrap p-2">
          { reggae.map((el) => <Card dataAlbum={ el } key={ el.collectionId } />)}
        </div>
      </>
    );
  }
}

export default GendersSearch;
