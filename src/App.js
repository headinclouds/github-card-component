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
    handleSubmit= (event) =>{
      event.preventDefault();
     axios.get(`https://api.github.com/search/users?q=${this.userName.value}`).then(resp=>{
       console.log(resp)
     })
    }
    render (){

      return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(input)=>{this.userName=input}}/>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }
class App extends Component {
  
 data  = [
  {
    "login": "headius",
    "id": 10135,
    "node_id": "MDQ6VXNlcjEwMTM1",
    "avatar_url": "https://avatars3.githubusercontent.com/u/10135?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/headius",
    "html_url": "https://github.com/headius",
    "followers_url": "https://api.github.com/users/headius/followers",
    "following_url": "https://api.github.com/users/headius/following{/other_user}",
    "gists_url": "https://api.github.com/users/headius/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/headius/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/headius/subscriptions",
    "organizations_url": "https://api.github.com/users/headius/orgs",
    "repos_url": "https://api.github.com/users/headius/repos",
    "events_url": "https://api.github.com/users/headius/events{/privacy}",
    "received_events_url": "https://api.github.com/users/headius/received_events",
    "type": "User",
    "site_admin": false,
    "score": 111.3597
    },
    {
    "login": "Head",
    "id": 51700,
    "node_id": "MDQ6VXNlcjUxNzAw",
    "avatar_url": "https://avatars1.githubusercontent.com/u/51700?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Head",
    "html_url": "https://github.com/Head",
    "followers_url": "https://api.github.com/users/Head/followers",
    "following_url": "https://api.github.com/users/Head/following{/other_user}",
    "gists_url": "https://api.github.com/users/Head/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Head/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Head/subscriptions",
    "organizations_url": "https://api.github.com/users/Head/orgs",
    "repos_url": "https://api.github.com/users/Head/repos",
    "events_url": "https://api.github.com/users/Head/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Head/received_events",
    "type": "User",
    "site_admin": false,
    "score": 100.18081
    },
    {
    "login": "headinthebox",
    "id": 1073054,
    "node_id": "MDQ6VXNlcjEwNzMwNTQ=",
    "avatar_url": "https://avatars2.githubusercontent.com/u/1073054?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/headinthebox",
    "html_url": "https://github.com/headinthebox",
    "followers_url": "https://api.github.com/users/headinthebox/followers",
    "following_url": "https://api.github.com/users/headinthebox/following{/other_user}",
    "gists_url": "https://api.github.com/users/headinthebox/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/headinthebox/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/headinthebox/subscriptions",
    "organizations_url": "https://api.github.com/users/headinthebox/orgs",
    "repos_url": "https://api.github.com/users/headinthebox/repos",
    "events_url": "https://api.github.com/users/headinthebox/events{/privacy}",
    "received_events_url": "https://api.github.com/users/headinthebox/received_events",
    "type": "User",
    "site_admin": false,
    "score": 95.2639
    }
  ]
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Form />
          <CardList cards={this.data} />
        </div>
      </div>
    );
  }
}

export default App;
