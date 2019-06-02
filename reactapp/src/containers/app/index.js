import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Logout from '../logout'
import SignUp from '../signup'
import Lists from '../lists'
import Card from '../card'
import PageHeader from '../../components/header'
import PageFooter from '../../components/footer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMenu } from '../../modules/app'
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
import MenuIcon from '@material-ui/icons/Menu'
import * as routes from '../../routes'
import SearchResults from '../../components/search-results'
import Searchbar from '../../components/searchbar'

const App = ({ app: { isMenuOpen }, toggleMenu }) => (
  <>
    <PageHeader />
    <Searchbar />
    <SearchResults />
    <main className="main">
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path="/about-us" component={About} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.logout} component={Logout} />
        <Route exact path={routes.signup} component={SignUp} />
        <Route exact path={routes.lists} component={Lists} />
        <Route exact path={routes.card} component={Card} />
      </Switch>
    </main>
    <PageFooter />
  </>
)

const mapStateToProps = ({ app, lists, analytics }) => ({
  app,
  lists,
  analytics
})

export default connect(mapStateToProps)(App)
