import React, { Component } from 'react';
// import logo from './../logo.svg';
// import './Header.css';
// import {debounce} from 'throttle-debounce';
// import Cart from './../Cart/Cart';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friends:[]
    }
  }

  componentDidMount(){
    var that = this;
    fetch('friends.json').then(function (response) {
        return response.json();
      }).then(function (result) {
        that.setState({ friends: result});
      });

  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }
    const image_path = "images/" + this.props.loggedInUser.toLowerCase()+".jpg"
    return (
      <div className="left-side-panel">
        <div className = "profile-pic">
          <img src = {image_path}/>
        </div>
        <div className="profile-header">{this.props.loggedInUser}</div>
        <div id = "friend-list">
          <div className="profile-header">Friends({this.state.friends.length})</div>
          {this.state.friends.map(friend => <div key = {keyValue()} className = "friend-list-item"><div className = "friend-pic"><img src = {friend.path} /></div><div className = "friend-name">{friend.name}</div></div>)}
        </  div>
      </div>
    );
  }
}




export default Profile;
