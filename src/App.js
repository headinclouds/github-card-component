import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

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
      <img className="img" src={this.props.card.avatar_url} alt="img"/>
      <div className="description">
        <div>{this.props.card.login}</div>
        <button ref="btn" onClick={() => {this.addToFavorites(this.props.card.url)}}>+Add to favorites</button>
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
      <img className="img" src={props.favorite.avatar_url} alt="img"/>
      <div className="description">
        <a>{props.favorite.login}</a>
        <div>{props.favorite.followers} followers</div>
        <div>{props.favorite.location}</div>

        <button onClick={()=>removeFromFav(props.favorite.id)}>- Remove from favorites</button>
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
          <Form onSubmit={this.searchUser}/>
          <div className="container">
            <div className="search-results">  
              <p>Search results: </p>    
                <CardList addFavorites={this.addFavorites}  cards={this.state.cards} />
            </div>
            <div>
              <p>Favorites: </p>
              <Favorites favorites={this.state.favorites} removeFromFav={this.removeFromFav}/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
