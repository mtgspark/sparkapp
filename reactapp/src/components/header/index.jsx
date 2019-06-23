import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMenu, closeMenu } from '../../modules/app'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Drawer,
  Button,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
  Divider
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import * as routes from '../../routes'
import withAuthProfile from '../../hocs/withAuthProfile'

const navItems = [
  {
    label: 'Home',
    url: routes.home,
    icon: ''
  },
  {
    label: 'Browse Lists',
    url: routes.lists
  },
  {
    label: 'Create List',
    url: routes.createList,
    requiresAuth: true
  },
  {
    label: 'Login',
    url: routes.login,
    requiresNotAuth: true
  },
  {
    label: 'Logout',
    url: routes.logout,
    requiresAuth: true
  }
]

const NavigationLink = props => (
  <Link
    {...props}
    style={{ display: 'block', width: '100%', height: '100%' }}
  />
)

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
  menuToggleIcon: {
    width: '4rem',
    height: '3rem'
  },
  menuList: {
    width: '280px'
  },
  menuListLink: {
    color: 'inherit',
    textDecoration: 'none'
    // todo: fix appearance if link in menu
  }
})

const DrawerContainer = withAuthProfile(({ auth, isMenuOpen, closeMenu }) => {
  const classes = useStyles()
  const isLoggedIn = auth.isLoaded ? !!auth.uid : null
  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={() => closeMenu()}>
      <MenuList className={classes.menuList}>
        <MenuItem>MTG Card Rank</MenuItem>
      </MenuList>
      <Divider />
      <MenuList className={classes.menuList}>
        {navItems.map(({ label, url, requiresAuth, requiresNotAuth }) =>
          (requiresAuth === true && !isLoggedIn) ||
          (requiresNotAuth === true && isLoggedIn) ? null : (
            <MenuItem button key={url} onClick={() => closeMenu()}>
              <NavigationLink
                className={classes.menuListLink}
                color="primary"
                variant="inherit"
                to={url}>
                <Typography component="div">
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  {label}
                </Typography>
              </NavigationLink>
            </MenuItem>
          )
        )}
      </MenuList>
    </Drawer>
  )
})

const PageHeader = ({ app: { isMenuOpen }, toggleMenu, closeMenu }) => {
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
            <MenuIcon className={classes.menuToggleIcon} />
            <span hidden>Menu</span>
          </Button>
        </Grid>
      </Grid>
      <DrawerContainer closeMenu={closeMenu} isMenuOpen={isMenuOpen} />
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
      toggleMenu,
      closeMenu
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader)
