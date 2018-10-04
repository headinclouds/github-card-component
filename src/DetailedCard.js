import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';


export class DetailedCard extends Component {
    state = {
        fullCard : {}
    }
    constructor(props){
        super(props);
        axios.get(`https://api.github.com/users/${props.match.params.id}`).then(resp=>{
            this.setState ({fullCard: resp.data})
     })
    }
    render(){
        return(
      <div className="card">
        <Link to="/" >Back</Link>

       <div className="card-body">
        <img className="img" src={this.state.fullCard.avatar_url} alt="img"/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{this.state.fullCard.login}</h5>
        <div>Name: {this.state.fullCard.name} followers</div>
        <div>{this.state.fullCard.followers} followers</div>
        <div>Location: {this.state.fullCard.location}</div>
        <div>Company: {this.state.fullCard.company}</div>
        <div>Bio: {this.state.fullCard.bio}</div>

      </div>
      
      </div>
  
    );
    }
  
  };