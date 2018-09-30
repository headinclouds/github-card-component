import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

const Card = (props) => {
  return(
    <div className="card">
      <img className="img" src={props.card.avatar_url} alt="img"/>
      <div className="description">
        <div>{props.card.login}</div>
        <div>{props.card.score}</div>
      </div>
    
    </div>

  );
};


  const CardList = (props) => {
    return (
      <div>
        {props.cards.map(card => <Card card={card}  key={card.id.toString()}/>)}
      </div>
    )
  }

  class Form extends Component {
    state = {userName: ''}
    handleSubmit= (event) =>{
      event.preventDefault();
     axios.get(`https://api.github.com/search/users?q=${this.state.userName}`).then(resp=>{
       console.log(resp.data.items)
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
  
 state = {
   cards: []}
  searchUser = (users) => {
    this.setState({cards : users.items})
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
          <CardList cards={this.state.cards} />
        </div>
      </div>
    );
  }
}

export default App;
