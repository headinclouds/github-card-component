import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Card = (props) => {
  return(
    <div className="card">
      <img className="img" src="http://www.mizaza.com/assets/administrator/default/img/av1.png" alt="img"/>
      <div className="description">
        <div>Name</div>
        <div>Company</div>
      </div>
    
    </div>

  );
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Card />
        </p>
      </div>
    );
  }
}

export default App;
