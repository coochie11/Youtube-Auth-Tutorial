import React, { Component } from "react";
import axios from 'axios';




export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event){
    // console.log("handle change", event);
    // console.log(event.target)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    const {
      email, password
    } = this.state;

    axios
      .post("http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        {withCredentials: true }
      // { method: 'post',
      // withCredentials: true }
      )
      .then(response =>{
        if (response.data.logged_in){
          console.log("Login.js respose.data")
          console.log(response.data)
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error =>{
        console.log("login error", error);
      })

    // console.log("form submitted");
    event.preventDefault();

    // railsのregistration_controllerと同様にuserでwrapする

  }


  render(){
    return (
      <div>

        <form onSubmit={this.handleSubmit} >
        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />




        <button type="submit" >Login</button>



        </form>

    </div>);

    
  }
}