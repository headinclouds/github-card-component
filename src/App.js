import React, { Component } from 'react';
import { DetailedCard } from './DetailedCard';
import logo from './logo.svg';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';

class Card extends Component {
  favorites = [];
  addToFavorites = (item) => {
    axios.get(item).then(resp => {
      this.props.addFavorites(resp.data);
    })
  }
  render() {
    return (
      <div className="card">
          <img className="img" src={this.props.card.avatar_url} alt="img" />
        <div className="card-body">
          <Link to={`/user/${this.props.card.login}`} className="card-title">{this.props.card.login}</Link>
          <button ref="btn" className="btn btn-primary" onClick={() => { this.addToFavorites(this.props.card.url) }}>+Add to favorites</button>
        </div>

      </div>

    );
  }

};


const Favorite = (props) => {
  const removeFromFav = (item) => {
    props.removeFromFav(item);

  }
  return (
    <div className="card">
        <img className="img" src={props.favorite.avatar_url} alt="img" />
      <div className="card-body">
        <Link to={`/user/${props.favorite.login}`} >{props.favorite.login}</Link>
        <div><strong>{props.favorite.followers}</strong> followers</div>
        {props.favorite.location ? <div><strong>Location: </strong>{props.favorite.location}</div> : null}
        <button className="btn btn-primary" onClick={() => removeFromFav(props.favorite.id)}>Remove</button>
      </div>
    </div>
  );
};


const CardList = (props) => {
      return (
        <div className="col">
          {props.cards.length  ?  <p>Search results: </p> : null}
          {props.cards.sort((a, b) => a.name - b.name)
            .map(card => <Card card={card} addFavorites={props.addFavorites}
              key={card.id.toString()} />)}
        </div>
      )


}

const Favorites = (props) => {
  return (
    <div className="col">
      {props.favorites.length ? <p>Favorites: </p> : null}
      <div>
        {props.favorites.sort((a, b) => a.name - b.name).map(favorite => <Favorite favorite={favorite} removeFromFav={props.removeFromFav} key={favorite.id.toString()} />)}
      </div>
    </div>
  )
}

class Form extends Component {
  state = { userName: '', submitted : false, result : [] }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/search/users?q=${this.state.userName}`).then(resp => {
      this.props.onSubmit(resp.data);
      this.setState({
        submitted: true,
        result: resp.data.items
      })
    })
  }
  render() {
    return (
      <div>
      <form className="input-group mb-3" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search GitHub user" className="form-control" value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" disabled={!this.state.userName} type="submit">Submit</button>
        </div>
      </form>
      {(this.state.submitted && this.state.result.length === 0) ? <div className="alert alert-info" role="alert">No results found :(</div> : null }
      </div>
    )
  }
}
class App extends Component {
  favoritesArr = [];
  state = {
    cards: [],
    favorites: []
  }
  searchUser = (users) => {
    this.setState({ cards: users.items })
  }

  addFavorites = (favorite) => {
    let indexRemove;
    this.favoritesArr.push(favorite);
    this.state.cards.map((val, index) => {
      if (val.id === favorite.id) {
        indexRemove = index;
      }
    });
    this.state.cards.splice(indexRemove, 1);
    this.setState({ favorites: this.favoritesArr })
  }

  removeFromFav = (favorite) => {
    let indexRemove;
    this.favoritesArr.map((val, index) => {
      if (val.id === favorite) {
        indexRemove = index;
        this.state.cards.push(val);
      }
    });
    this.favoritesArr.splice(indexRemove, 1);
    this.setState({ favorites: this.favoritesArr });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Quick search github users</h1>
        </header>
        <div className="App-intro">
          <div className="container">
            <div className="row">
              <div className="col">
                <Form onSubmit={this.searchUser} />
              </div>
            </div>
            <BrowserRouter basename="github-card-component">
              <Switch>
                <Route path="/" exact render={
                  () => {
                    return (
                      <div className="row">
                        <CardList addFavorites={this.addFavorites} cards={this.state.cards} />
                        <Favorites favorites={this.state.favorites} removeFromFav={this.removeFromFav} /></div>
                    )
                  }}></Route>
                <Route path="/user/:id" component={DetailedCard}></Route>
              </Switch>
            </BrowserRouter>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
