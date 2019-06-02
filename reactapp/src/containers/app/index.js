import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Logout from '../logout'
import SignUp from '../signup'
import Lists from '../lists'
import * as routes from '../../routes'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to={routes.lists}>Lists</Link>
    </header>

    <main>
      <Route exact path="/about-us" component={About} />
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.logout} component={Logout} />
      <Route exact path={routes.signup} component={SignUp} />
      <Route exact path={routes.lists} component={Lists} />
      <Route exact path={routes.home} component={Home} />
    </main>
  </div>
)

export default App
