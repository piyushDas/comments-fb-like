import React, { Component } from 'react';
// import Comment from './Comment/comment';

class NewPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPost:""
    }
  }

  getMessage(e){
    this.setState({
      currentPost:e.currentTarget.value
    })
  }

  createPost(){
    this.props.postHandler(this.state.currentPost);
    document.getElementById('new-post').value = "";
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div className="new-post">
        <h4>Say something to Piyush!</h4>
        <textarea onBlur = {this.getMessage.bind(this)} id = "new-post"></textarea>
        <div>
         <button type = "button" onClick = {this.createPost.bind(this)}> Post </button>
        </div>
      </div>
    );
  }
}




export default NewPost;
