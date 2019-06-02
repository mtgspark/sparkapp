import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMenu } from '../../modules/app'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import * as routes from '../../routes'
import { red } from '@material-ui/core/colors'

const navItems = [
  {
    label: 'Home',
    url: routes.home
  },
  {
    label: 'Browse Lists',
    url: routes.lists
  },
  {
    label: 'Create List',
    url: routes.createList
  },
  {
    label: 'Login',
    url: routes.login
  },
  {
    label: 'Logout',
    url: routes.logout
  }
]

const PageHeader = ({ app: { isMenuOpen }, toggleMenu }) => {
  const useStyles = makeStyles({
    header: {
      padding: '1rem 2rem',
      marginBottom: '2rem'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1',
      textDecoration: 'none !important',
      color: 'black'
    },
    logoSmall: {
      display: 'block',
      fontSize: '1rem',
      textTransform: 'uppercase'
    },
    menuIcon: {
      width: '4rem',
      height: '3rem'
    }
  })

  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Grid container>
        <Grid item xs={6} align="left">
          <Link to={routes.home} className={classes.logo}>
            Spark
            <small className={classes.logoSmall}>MTG Card Rank</small>
          </Link>
        </Grid>
        <Grid item xs={6} align="right">
          <Button onClick={() => toggleMenu()}>
            <MenuIcon className={classes.menuIcon} />
            <span hidden>Menu</span>
          </Button>
        </Grid>
      </Grid>

      <Drawer anchor="right" open={isMenuOpen} onClose={() => toggleMenu()}>
        <List>
          {navItems.map(({ label, url }) => (
            <ListItem button key={url}>
              <Link to={url}>
                <ListItemText primary={label} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </header>
  )
}

const mapStateToProps = ({ app, lists, analytics }) => ({
  app,
  lists,
  analytics
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader)
