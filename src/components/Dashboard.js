import React, {Component} from "react";
import axios from "axios";
import Favorite from "./Favorite";



import { withStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';


const styles = theme=>({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },

});

const featuredPosts = [
  {
    title: "Featureffafd post",
    date: "Nov 15",
    description:
    "this is a test",
  },
]

class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state={favorites: []}
  }

  componentDidMount(){
    
    axios
    .get("http://localhost:3001/favorites/dashboard",
    {withCredentials: true })
    .then(res =>{
      console.log("get", res);
      console.log("get", res.data.favo_all);
      console.log(typeof res.data.favo_all);
      console.log([res.data.favo_all])

      // Array.prototype.push.apply(favoritess, [res.data.favo_all])
      // console.log(favoritess)


      this.setState({favorites: res.data.favo_all})

    })
    .catch(error=>{
      console.log("error", error);
    })
  }




  render(){
    const { classes } = this.props;

    return(
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar className="{classes.toolbar}">
            <Button size="small">
              Like
            </Button>
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}>
              {this.props.user.email}
            </Typography>
            <IconButton>
              <SearchIcon />
            </IconButton>
            {/* <Button variant="outlined" size="small">Me</Button> */}
            <Favorite loggedInStatus = {this.props.loggedInStatus}
            user={this.props.user} />
          </Toolbar>
          {/* <Toolbar 
          component="nav" 
          variant="dense"
          className={classes.toolbarSecondary}
          >
          </Toolbar> */}
          <main>
            {/* <Paper className={classes.mainFeaturedPost}>
              {
                <img
                  style={{ display: 'none' }}
                  src="https://source.unsplash.com/user/erondu"
                  alt="background"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <Typography 
                  component="h1"
                  variant="h5"
                  color="inherit"
                  gutterBottom>
                     Title of a longer featured blog post
                  </Typography>
                </Grid>
  
              </Grid>
            </Paper> */}
  
            <Grid container spacing={4}>
              {this.state.favorites.map(post => (
                <Grid item key={post.id}
                xs={6} md={3} >
                  <CardActionArea component="a" href="#">
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {/* {console.log(post)} */}
                            {post.favorite_thing}
                            {/* {post.name} */}
                          </Typography>
                          {/* <Typography variant="subtitle1" color="textSecondary">
                            {post.description}
                          </Typography> */}
                        </CardContent>
                        <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title" />
                        <CardActions>
                          <Button size="small">
                            learn more
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </CardActionArea>
  
                  
                </ Grid>
  
  
                      
  
  
  
              ))}
            </Grid>
            
  
          </main>
  
        </Container>
  
  
      </React.Fragment>
  
  );
  }
  
  
}




export default withStyles(styles)(Dashboard)
