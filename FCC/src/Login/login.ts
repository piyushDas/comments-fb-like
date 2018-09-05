import React, { Component } from 'react';


class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }
    const friends= [{
      name:"Tannu",
      path:""
    }]
    return (
      <div>
        <div className="back-overlay"></div>
        <div className = "modal-overlay">
          <h3>Login</h3>
          <div><img src = ""/></div>
          <div className = "input-div">
            <input type = "text" />
          </div>
          <div className = "input-div">
            <input type = "password" />
          </div>
          <div className = "input-div">
            <button>Login</button>
          </div>
        </div>
      </div>
    );
  }
}




export default Login;
