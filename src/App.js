import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  initialSession = (yesOrNo) => {
    this.setState({
      login: yesOrNo,
    });
  }

  render() {
    const { login } = this.state;
    return (
      <div className="app bg-black bg-gradient">
        <Switch>
          <Route exact path="/">
            { login ? <Redirect to="/search" /> : <Login
              initialSession={ this.initialSession }
            /> }
          </Route>
          <Route path="/login">
            { login ? <Redirect to="/search" /> : <Login
              initialSession={ this.initialSession }
            /> }
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" exact component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
