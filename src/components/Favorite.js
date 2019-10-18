import React, { Component } from "react";
import axios from "axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

console.log("favorites")

export default class Favorite extends Component{
  constructor(props){
    super(props);

    console.log(this.props)
    console.log("user")
    console.log(this.props.user)
    console.log(this.props.user.email)

    this.state={
      open: false,
      favorite: "",
      user: this.props.user,
    }

    console.log("state", this.state)

    console.log("favorites, hi.")
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClickOpen(){
    this.setState({open: true})
  }

  handleClose(){
    this.setState({open: false})
    this.setState({favorite: ""})

  }

  handleChange(event){
    this.setState({favorite: event.target.value})
  }

  handleSubmit(event){
    console.log(this.state)
    const { favorite } = this.state;

    axios
    .post("http://localhost:3001/favorites",
      {
        favorite: favorite,
        user: this.state.user,
      },
      // {withCredentials: true }
    )
    .then(response =>{
      console.log("then favo res", response);
      console.log(response.data);
    })
    .catch(error =>{
      console.log("favo error", error);
    })

    this.setState({open: false})


  }

  render(){
    return(
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen} size="small" >
          New
        </Button>
        <Dialog
        open={this.state.open}>
          <DialogTitle>
          {"Are you mother fucker?"}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Fuck Ya!
            </DialogContentText> */}
            <TextField
            autoFocus
            margin="dense"
            id="name"
            name="favorite"
            label="What's your Favorite?"
            type="email"
            fullWidth
            onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
            Submit
            </Button>
          </DialogActions>

        </Dialog>


      </div>

    );
  }

}



