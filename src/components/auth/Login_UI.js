import React, { Component } from "react";
import axios from 'axios';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';


// const styles = theme => ({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

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
    console.log("handle change", event);
    console.log(event.target)
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