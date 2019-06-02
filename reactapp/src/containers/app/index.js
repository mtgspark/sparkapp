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
import * as routes from '../../routes'
import CreateList from '../create-list'
import EditList from '../edit-list'

const App = () => (
  <>
    <PageHeader />
    <Searchbar />
    <SearchResults />
    <main className="main">
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.logout} component={Logout} />
        <Route exact path={routes.lists} component={Lists} />
        <Route exact path={routes.card} component={Card} />
        <Route exact path={routes.createList} component={CreateList} />
        <Route exact path={routes.editListWithVar} component={EditList} />
      </Switch>
    </main>
    <PageFooter />
  </>
)

export default App
