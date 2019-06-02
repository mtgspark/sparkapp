import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import Login from '../login'
import Logout from '../logout'
import Lists from '../lists'
import Card from '../card'
import PageHeader from '../../components/header'
import PageFooter from '../../components/footer'
import Searchbar from '../../components/searchbar'
import SearchResults from '../../components/search-results'
import CreateList from '../create-list'
import EditList from '../edit-list'
import { Container } from '@material-ui/core'
import * as routes from '../../routes'

const App = () => (
  <>
    <PageHeader />
    <main className="main">
      <Container maxWidth="lg">
        <Searchbar />
        <SearchResults />
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.logout} component={Logout} />
          <Route exact path={routes.lists} component={Lists} />
          <Route exact path={routes.card} component={Card} />
          <Route exact path={routes.createList} component={CreateList} />
          <Route exact path={routes.editListWithVar} component={EditList} />
        </Switch>
      </Container>
    </main>
    <PageFooter />
  </>
)

export default App
