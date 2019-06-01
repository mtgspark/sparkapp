import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Logout from '../logout'
import SignUp from '../signup'
import * as routes from '../../routes'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path={routes.home} component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path={routes.login} component={Login} />
      <Route exact path={routes.logout} component={Logout} />
      <Route exact path={routes.signup} component={SignUp} />
    </main>
  </div>
)

export default App
