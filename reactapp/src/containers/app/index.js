import React, { useEffect } from 'react'
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
import PrivacyPolicy from '../privacy-policy'
import { Container } from '@material-ui/core'
import * as routes from '../../routes'

const RouteWithMeta = ({ meta, ...routeProps }) => {
  useEffect(() => {
    document.title = `${meta.title} - MTG Card Rank`
  }, [meta])

  return <Route {...routeProps} />
}

const App = () =>
  window.location.href.includes('mtgcardrank') &&
  localStorage.getItem('sparky') !== 'yes' ? (
    <div>
      Coming soon
      <span onClick={() => localStorage.setItem('sparky', 'yes')}>...</span>
    </div>
  ) : (
    <>
      <PageHeader />
      <main className="main">
        <Container maxWidth="lg">
          <Switch>
            <RouteWithMeta
              exact
              path={routes.home}
              component={Home}
              meta={{
                title: 'Rank different Magic The Gathering cards with lists'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.login}
              component={Login}
              meta={{ title: 'Log in to manage your lists, vote and comment' }}
            />
            <RouteWithMeta
              exact
              path={routes.logout}
              component={Logout}
              meta={{ title: 'Logging you out' }}
            />
            <RouteWithMeta
              exact
              path={routes.lists}
              component={Lists}
              meta={{ title: 'Browse the lists of Magic The Gathering cards' }}
            />
            <RouteWithMeta
              exact
              path={routes.card}
              component={Card}
              meta={{ title: 'View a single card' }}
            />
            <RouteWithMeta
              exact
              path={routes.createList}
              component={CreateList}
              meta={{ title: 'Create a new list' }}
            />
            <RouteWithMeta
              exact
              path={routes.viewListWithVar}
              component={ViewList}
              meta={{ title: 'View a list of Magic The Gathering cards' }}
            />
            <RouteWithMeta
              exact
              path={routes.editListWithVar}
              component={EditList}
              meta={{ title: 'Edit your list' }}
            />
            <RouteWithMeta
              exact
              path={routes.admin}
              component={Admin}
              meta={{ title: 'Admins only area' }}
            />
            <RouteWithMeta
              exact
              path={routes.myAccount}
              component={MyAccount}
              meta={{ title: 'View details about your account' }}
            />
            <RouteWithMeta
              exact
              path={routes.privacyPolicy}
              component={PrivacyPolicy}
              meta={{ title: 'Our privacy policy' }}
            />
          </Switch>
        </Container>
      </main>
      <PageFooter />
    </>
  )

export default App
