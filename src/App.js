import React, { Component } from 'react';
import {DetailedCard} from './DetailedCard';
import logo from './logo.svg';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import './App.css';

class Card extends Component {
  favorites = []; 
  addToFavorites = (item) => {
      axios.get(item).then(resp=>{
      this.props.addFavorites(resp.data);
    })
  }
  render(){
      return(
    <div className="card">
        <div className="card-body">
            <img className="img" src={this.props.card.avatar_url} alt="img"/>
      </div>
      <div className="card-body">
        <Link to={`/user/${this.props.card.login}`} className="card-title">{this.props.card.login}</Link>
        <button ref="btn" className="btn btn-primary" onClick={() => {this.addToFavorites(this.props.card.url)}}>+Add to favorites</button>
      </div>
    
    </div>

  );
  }

};


const Favorite = (props) => {
  const removeFromFav = (item) => {
    props.removeFromFav(item);

  }
  return(
    <div className="card">
      <div className="card-body">
        <img className="img" src={props.favorite.avatar_url} alt="img"/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.favorite.login}</h5>
        <div>{props.favorite.followers} followers</div>
        <div>{props.favorite.location}</div>

        <button className="btn btn-primary" onClick={()=>removeFromFav(props.favorite.id)}>- Remove from favorites</button>
      </div>
    
    </div>

  );
};


  const CardList = (props) => {
    return (
      <div>
        {props.cards.sort((a, b) => a.name - b.name)
                    .map(card => <Card card={card} addFavorites={props.addFavorites}
                                        key={card.id.toString()}/>)}
      </div>
    )
  }

  const Favorites = (props) => {
    return (
      <div>
        {props.favorites.sort((a, b) => a.name - b.name).map(favorite => <Favorite favorite={favorite} removeFromFav={props.removeFromFav} key={favorite.id.toString()}/>)}
      </div>
    )
  }

  class Form extends Component {
    state = {userName: ''}
    handleSubmit= (event) =>{
      event.preventDefault();
     axios.get(`https://api.github.com/search/users?q=${this.state.userName}`).then(resp=>{
       this.props.onSubmit(resp.data);
     })
    }
    render (){
      return(
        <form className="input-group mb-3" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" value={this.state.userName}
          onChange={(event)=> this.setState({userName: event.target.value})}
          />
          <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">Submit</button>

          </div>
        </form>
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
    this.setState({cards : users.items})
  }

  addFavorites = (favorite) => {
    let indexRemove;
    this.favoritesArr.push(favorite);
    this.state.cards.map((val, index) => {
      if (val.id===favorite.id){
        indexRemove = index;
      }
    });
    this.state.cards.splice(indexRemove, 1);
    this.setState({favorites: this.favoritesArr})
  }

  removeFromFav = (favorite) => {
    let indexRemove;
    this.favoritesArr.map((val, index) => {
      if (val.id===favorite){
        indexRemove = index;
        this.state.cards.push(val);
      }
    });
    this.favoritesArr.splice(indexRemove, 1);
    this.setState({favorites: this.favoritesArr});

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="container">
          <div className="row">
          <div className="col">  
            <Form onSubmit={this.searchUser}/>
            </div>
          </div>
          <div className="row">
            <div className="col">  
            <p>Search results: </p>
            <BrowserRouter>
            <Switch>
            <Route path="/" exact render={
              ()=> { return <CardList addFavorites={this.addFavorites}  cards={this.state.cards} />}}></Route>
              <Route path="/user/:id" component={DetailedCard}></Route>

                </Switch>

              </BrowserRouter>

            </div>
            <div className="col">
              <p>Favorites: </p>
              <Favorites favorites={this.state.favorites} removeFromFav={this.removeFromFav}/>
            </div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
