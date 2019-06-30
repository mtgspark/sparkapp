import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import Login from '../login'
import Logout from '../logout'
import Lists from '../lists'
import Card from '../card'
import PageHeader from '../../components/header'
import PageFooter from '../../components/footer'
import CreateList from '../create-list'
import EditList from '../edit-list'
import ViewList from '../view-list'
import MyAccount from '../my-account'
import Admin from '../admin'
import { Container } from '@material-ui/core'
import * as routes from '../../routes'

const App = () =>
  window.location.href.includes('mtgcardrank') &&
  localStorage.getItem('sparky') !== 'yes' ? (
    <div>Coming soon...</div>
  ) : (
    <>
      <PageHeader />
      <main className="main">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.logout} component={Logout} />
            <Route exact path={routes.lists} component={Lists} />
            <Route exact path={routes.card} component={Card} />
            <Route exact path={routes.createList} component={CreateList} />
            <Route exact path={routes.viewListWithVar} component={ViewList} />
            <Route exact path={routes.editListWithVar} component={EditList} />
            <Route exact path={routes.admin} component={Admin} />
            <Route exact path={routes.myAccount} component={MyAccount} />
          </Switch>
        </Container>
      </main>
      <PageFooter />
    </>
  )

export default App
