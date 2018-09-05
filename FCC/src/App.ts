import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login/login';
import Profile from './Profile/profile';
import Post from './Post/post';
import NewPost from './New-post/new-post';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser:"Piyush",
      profile:"",
      posts:[]
    };
  }

  componentDidMount(){
    var that = this;
    if(localStorage.getItem("posts")){
      that.setState({ posts: JSON.parse(localStorage.getItem("posts"))});
    } else {
      fetch('posts.json').then(function (response) {
          return response.json();
        }).then(function (result) {
          that.setState({ posts: result});
        });
    }
  }

  postHandler(data) {
    console.log(this.state.posts[this.state.posts.length-1].id + 1);
    var postObj = {
      "id": this.state.posts[this.state.posts.length-1].id + 1,
      "name":this.state.loggedInUser,
      "image_path":"images/"+this.state.loggedInUser+".jpg",
      "post":data,
      "timestamp": new Date(),
      "comments":[]
    }
    this.setState({
        posts: this.state.posts.concat([postObj])
    });
    console.log(this.state.posts);
    let temp = this.state.posts.concat([postObj]);
    localStorage.setItem("posts",JSON.stringify(temp));
  }

  commentHandler(data, id) {

    let index = this.findWithAttr(this.state.posts, "id", id);
    let comment_id = "comment_"+ id + "_" +(this.state.posts[index].comments.length + 1);
    var postObj = {
      "id": comment_id,
      "name":this.state.loggedInUser,
      "image_path":"images/"+this.state.loggedInUser+".jpg",
      "post":data,
      "timestamp": new Date(),
      "comments":[]
    }

    let stateCopy = JSON.parse(JSON.stringify(this.state.posts));
    stateCopy[index].comments.push(postObj);
    this.setState({
      posts: stateCopy
    })

    localStorage.setItem("posts",JSON.stringify(stateCopy));
  }

  findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
  }

  assignTimestamp(time){
    if(!time){
      return;
    }
    let currentTime = new Date();
    time = new Date(time);
    let difference = (currentTime - time)/1000;
    console.log(difference);
    // let that = this;
    // setTimeout(function(){
    //   console.log(time);
    //   console.log("in time");
    //   that.assignTimestamp(time);
    // }, 60000);

    if(difference < 60){
      return "Just now";
    } else if(difference >= 60 && difference < 3600){
      return Math.floor(difference/60)  + " minutes ago";
    } else if(difference >= 3600 && difference < 86400){
      return Math.floor(difference/3600) + " hours ago";
    } else if(difference >= 86400 && difference < 2592000){
      return Math.floor(difference/86400) + " days ago";
    } else {
      return time.toDateString();
    }
  }


  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    //localStorage.setItem("posts", JSON.stringify(this.state.posts));

    return (
      <div className = "App">
        { !this.state.loggedInUser &&  <Login/>}
        <header>
          <img src = "images/fb_logo.png"/><span>Facebook Communication Center</span>
        </header>

        <Profile loggedInUser = {this.state.loggedInUser}/>
        <div className = "right-side-panel">
          <NewPost postHandler = {this.postHandler.bind(this)}/>

          {this.state.posts.map( post => <Post post = {post} key = {keyValue()} commentHandler = {this.commentHandler.bind(this)} assignTimestamp = {this.assignTimestamp.bind(this)}/>)}
        </div>
      </div>
    );
  }
}

export default App;
