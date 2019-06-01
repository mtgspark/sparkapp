import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Logout from '../logout'
import SignUp from '../signup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMenu } from '../../modules/app';
import {
  Grid,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import * as routes from '../../routes'

const App = ({ app: { isMenuOpen }, toggleMenu, ...props }) => (

  <>
    <header className="header">

      <Grid container>
        <Grid item xs={6} align="left">
          [spark]
        </Grid>
        <Grid item xs={6} align="right">
          <Button onClick={() => toggleMenu() }>
            <MenuIcon />
            Menu
          </Button>        
        </Grid>
      </Grid>
      
      <Drawer anchor="right" open={isMenuOpen} onClose={() => toggleMenu() }>
        <List>
          {['Home', 'About', 'Feedback', 'My Account'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Link to={routes.login}>Login</Link>
        <Link to={routes.logout}>Logout</Link>
        <Link to={routes.signup}>SignUp</Link>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
      </Drawer>
      
    </header>

    <main className="main">
      <Route exact path={routes.home} component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.logout} component={Logout} />
      <Route exact path={routes.signup} component={SignUp} />
    </main>

    <footer className="footer" align="center" color="">
      <p className="brand">&copy; Spark</p>
    </footer>
  </>
)

const mapStateToProps = ({ app, lists, analytics }) => ({
  app,
  lists,
  analytics
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleMenu 
  },
  dispatch
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
