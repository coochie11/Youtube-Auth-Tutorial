import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";

import Home from './components/Home';
import Dashboard from "./components/Dashboard";



export default class App extends Component {
  constructor(){
    super();
    this.state={
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    }

    console.log(this.state)

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus(){
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response =>{
      // console.log("logged in?", response);
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        console.log("if started");
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        });
      } else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){
        console.log("else if started")
        this.setState({
          loggedInStatus: response.data.user,
          user: {}
        })
      }
    })
    .catch(error =>{
      console.log("check login error", error);
    });
  }

  componentDidMount(){
    console.log("App.js compDM started");
    this.checkLoginStatus();
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render(){
    return (
      <div className="App">
      <BrowserRouter>
      <Switch>
      <Route 
      exact path={"/"} render={props=>(
        <Home {...props} 
        handleLogin = {this.handleLogin}
        handleLogout = {this.handleLogout}
        loggedInStatus = {this.state.loggedInStatus}  />
      )} />
      {/* {...props}で全てのpropを受け取る */}
      <Route 
      exact path={"/dashboard"} render={props=>(
        <Dashboard {...props} loggedInStatus = {this.state.loggedInStatus} />
      )} />
      </Switch>
      </BrowserRouter>
      
      </div>
    );
  }
}
