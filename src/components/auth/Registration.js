import React, { Component } from "react";
import axios from 'axios';

export default class Registration extends Component{
  constructor(props){
    super(props)

    console.log("hi Registration")
    console.log(props)

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""

    }



    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    console.log("handle change", event);
    console.log(event.target)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    const {
      email, password, password_confirmation
    } = this.state;

    axios
      .post("http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        {withCredentials: true }
      // { method: 'post',
      // withCredentials: true }
      )
      .then(response =>{
        console.log("then registration res", response);
        console.log(response.data.status)
        if (response.data.status === 201){
          console.log("created")
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error =>{
        console.log("registration error", error);
      })

    // console.log("form submitted");
    event.preventDefault();

    // railsのregistration_controllerと同様にuserでwrapする

  }


  render(){
    return (<div>
      <form onSubmit={this.handleSubmit} >
      <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
      <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
      <input type="password_confirmation" name="password_confirmation" placeholder="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />

      <button type="submit" >Registar</button>
      </form>
    </div>);

    
  }
}