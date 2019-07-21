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
    document.title = `${meta.title} &mdash; MTG Card Rank`

    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', meta.description)
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
                title: 'Rank different Magic The Gathering cards with lists',
                description:
                  'A website that allows anyone to rank Magic The Gathering cards by any metric they want. Other users can commit and rate your lists to determine the best list of cards.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.login}
              component={Login}
              meta={{
                title: 'Log in to manage your lists, vote and comment',
                description:
                  'Use the log in form to log in to your account so that you can create, edit, comment on and vote on lists of cards.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.logout}
              component={Logout}
              meta={{
                title: 'Logging you out',
                description:
                  'Visit this page to automatically log out of your account.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.lists}
              component={Lists}
              meta={{
                title: 'Browse the lists of Magic The Gathering cards',
                description:
                  'All available lists of Magic The Gathering cards are shown here so that you can browse them.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.card}
              component={Card}
              meta={{
                title: 'View a single card',
                description:
                  'An overview of a single Magic The Gathering card that shows statistics such as which lists the card is featured in.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.createList}
              component={CreateList}
              meta={{
                title: 'Create a new list',
                description:
                  'A form that lets you create a new list of Magic The Gathering cards.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.viewListWithVar}
              component={ViewList}
              // TODO: Use list title as page title
              meta={{
                title: 'View a list of Magic The Gathering cards',
                description:
                  'This is a list of Magic The Gathering cards, who created the list and by which metric they used to create the list.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.editListWithVar}
              component={EditList}
              meta={{
                title: 'Edit your list',
                description:
                  'This form lets you edit your list of Magic The Gathering cards.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.admin}
              component={Admin}
              meta={{
                title: 'Admins only area',
                description: 'A restricted space for admins only.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.myAccount}
              component={MyAccount}
              meta={{
                title: 'View details about your account',
                description:
                  'An overview of your account including a way to change your username and see statistics of your account.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.privacyPolicy}
              component={PrivacyPolicy}
              meta={{
                title: 'Our privacy policy',
                description:
                  'View the privacy policy of our website including what we do with your personal data.'
              }}
            />
          </Switch>
        </Container>
      </main>
      <PageFooter />
    </>
  )

export default App
