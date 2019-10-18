import React, { Component } from 'react';
import axios from 'axios';
import Registration from './auth/Registration'
// import Login from './auth/Login'
import FunctionalLogin from './auth/Login_UI';

export default class Home extends Component{
  constructor(props){
    super(props);
    console.log("Home props")
    console.log(props)
    console.log(props.history)

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

  }

  handleLogoutClick(){
    console.log("logout clicked")

    axios.delete("http://localhost:3001/logout", { withCredentials: true})
    .then(response =>{
      this.props.handleLogout();
    })
    .catch(error=>{
      console.log("logout error", error);
    })

  }

  handleSuccessfulAuth(data){
    console.log("handleSuccessfulAuth started")
    console.log(this.props)
    // TODO update parent component
    this.props.handleLogin(data);
    // this.props.history.push("/dashboard");
    this.props.history.push("/dashboard");
  }

  render(){
    return(
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={()=> this.handleLogoutClick()}>Logout</button>
        {/* <button onClick={this.handleLogoutClick}>Logout</button> */}
        {/* arrow関数でも違いないよね */}
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        {/* <Login handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
        <FunctionalLogin handleSuccessfulAuth={this.handleSuccessfulAuth} />


      </div>
    );
  }
}
