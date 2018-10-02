import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

class Card extends Component {
  favorites = []; 
  addToFavorites = (item) => {
    axios.get(item).then(resp=>{
     this.props.favorites(resp.data);
    })
  }
  render(){
      return(
    <div className="card">
      <img className="img" src={this.props.card.avatar_url} alt="img"/>
      <div className="description">
        <div>{this.props.card.login}</div>
        <div>{this.props.card.score}</div>
        <button onClick={() => {this.addToFavorites(this.props.card.url)}}>+Add to favorites</button>
      </div>
    
    </div>

  );
  }

};


const Favorite = (props) => {
  const removeFromFav = (item) => {
    console.log(item)
  }
  return(
    <div className="card">
      <img className="img" src={props.favorite.avatar_url} alt="img"/>
      <div className="description">
        <div>{props.favorite.login}</div>
        <div>{props.favorite.name}</div>
        <div>{props.favorite.followers} followers</div>
        <div>{props.favorite.bio}</div>

        <div >- Remove from favorites</div>
      </div>
    
    </div>

  );
};


  const CardList = (props) => {
    return (
      <div>
        {props.cards.map(card => <Card card={card} favorites={props.favorites} key={card.id.toString()}/>)}
      </div>
    )
  }

  const Favorites = (props) => {
    return (
      <div>
        {props.favorites.map(favorite => <Favorite favorite={favorite}  key={favorite.id.toString()}/>)}
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
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.userName}
          onChange={(event)=> this.setState({userName: event.target.value})}
          />
          <button type="submit">Submit</button>
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

  addFavorites = (favorites) => {
    this.favoritesArr.push(favorites);
    this.setState({favorites: this.favoritesArr})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Form onSubmit={this.searchUser}/>
          <div className="container">
            <div className="search-results">  
              <p>Search results: </p>    
                <CardList favorites={this.addFavorites} cards={this.state.cards} />
            </div>
            <div>
              <p>Favorites: </p>
              <Favorites favorites={this.state.favorites} />

            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
