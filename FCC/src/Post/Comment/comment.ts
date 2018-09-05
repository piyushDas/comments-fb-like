import React, { Component } from 'react';
// import logo from './../logo.svg';
// import './Header.css';
// import {debounce} from 'throttle-debounce';
// import Cart from './../Cart/Cart';

class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentComment:"",
      currentTime: this.props.assignTimestamp(this.props.comment.timestamp)

    }
  }

  getComment(e){
    this.setState({
      currentComment:e.currentTarget.value
    })
  }

  componentDidMount() {
    let that = this;
    setInterval(function(){
      that.setState({ currentTime:that.props.assignTimestamp(that.props.comment.timestamp) })
    }, 60000);
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div className="comment">
        <div className="post">
          <div className = "post-header">
            <img src = {this.props.comment.image_path}/>
            <div className = "post-header-title">
              <div><span className = "commented_by">{this.props.comment.name}: </span>{this.props.comment.post}</div>
              <div className = "">
                <span>{this.state.currentTime}</span>
              </div>
            </div>
          </div>
         </div>
      </div>
    );
  }
}




export default Comment;
