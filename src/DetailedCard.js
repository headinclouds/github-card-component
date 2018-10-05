import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class DetailedCard extends Component {
  state = {
    fullCard: {}
  }
  constructor(props) {
    super(props);
    axios.get(`https://api.github.com/users/${props.match.params.id}`).then(resp => {
      this.setState({ fullCard: resp.data })
    })
  }
  render() {
    return (
      <div className="row">

        <div className="col">
          <Link to="/" >Back</Link>
          <div className="card">
              <img className="img-large" src={this.state.fullCard.avatar_url} alt="img" />
            <div className="card-body">
              <h5 className="card-title"><strong>{this.state.fullCard.login}</strong></h5>
              <div><strong>{this.state.fullCard.followers}</strong> followers</div>
              {this.state.fullCard.name ? <div><strong>Name: </strong>{this.state.fullCard.name}</div> : null}
              {this.state.fullCard.location ? <div><strong>Location:</strong> {this.state.fullCard.location}</div> : null}
              {this.state.fullCard.company ? <div><strong>Company:</strong> {this.state.fullCard.company}</div> : null}
              {this.state.fullCard.bio ? <div><strong>Bio:</strong> {this.state.fullCard.bio}</div> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

};