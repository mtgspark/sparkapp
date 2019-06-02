import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Logout from '../logout'
import SignUp from '../signup'
import Lists from '../lists'
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

const navItems = [
  {
    label: 'Home',
    url: routes.home
  },
  {
    label: 'Browse Lists',
    url: routes.lists
  }
]

const App = ({ app: { isMenuOpen }, toggleMenu }) => (

  <>
    <header className="header">

      <Grid container>
        <Grid item xs={6} align="left">
          <Link to={routes.home}>[spark]</Link>
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
          {
            navItems.map(({ label, url }) => (
              <ListItem button key={url}>
                <Link to={url}>
                  <ListItemText primary={label} />
                </Link>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      
    </header>

    <main className="main">
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path="/about-us" component={About} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.logout} component={Logout} />
        <Route exact path={routes.signup} component={SignUp} />
        <Route exact path={routes.lists} component={Lists} />
      </Switch>
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
