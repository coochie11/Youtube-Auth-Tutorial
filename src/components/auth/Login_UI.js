import React, { Component } from "react";
import axios from 'axios';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
});




class FunctionalLogin extends Component{
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
    const { classes } = this.props;

    return (
      <div className={classes.container}>

        <form onSubmit={this.handleSubmit}>
          <FormControl className={classes.formControl}>
          <InputLabel  >email</InputLabel>
          <Input type="email" name="email" placeholder="Email" 
          value={this.state.email} onChange={this.handleChange} required  onChange={this.handleChange} />
          </FormControl>

          <FormControl className={classes.formControl}>
          <InputLabel>Password</InputLabel>
          <Input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
          </FormControl>

          <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
        </form>


    </div>);

    
  }
}

FunctionalLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FunctionalLogin);