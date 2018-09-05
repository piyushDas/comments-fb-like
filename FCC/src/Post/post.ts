import React, { Component } from 'react';
// import logo from './../logo.svg';
// import './Header.css';
// import {debounce} from 'throttle-debounce';
import Comment from './Comment/comment';

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: this.props.assignTimestamp(this.props.post.timestamp)
    }
  }

  componentDidMount() {
    let that = this;
    setInterval(function(){
      that.setState({ currentTime:that.props.assignTimestamp(that.props.post.timestamp) })
    }, 60000);
  }

  postComment(e){
    this.props.commentHandler(e.currentTarget.parentElement.children[0].value, this.props.post.id);
    e.currentTarget.parentElement.children[0].value = "";
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div>
        <div className="post">
          <div className = "post-header">
            <img src = {this.props.post.image_path}/>
            <div className = "post-header-title">
              <div>{this.props.post.name}</div>
              <div>{this.state.currentTime}</div>
            </div>
          </div>
          <div className = "post-content">
            <div>{this.props.post.post}</div>
          </div>
        </div>
        {this.props.post.comments.map(comment => <Comment comment = {comment} assignTimestamp = {this.props.assignTimestamp.bind(this)}/>)}
        <div className = "reply">
          <textarea></textarea>
          <button type = "button" onClick = {this.postComment.bind(this)}> Post </button>
        </div>
      </div>
    );
  }
}




export default Post;
