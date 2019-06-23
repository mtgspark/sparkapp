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
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
  Divider
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import * as routes from '../../routes'

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

      <Drawer anchor="right" open={isMenuOpen} onClose={() => toggleMenu()}>
        <MenuList className={classes.menuList}>
          <MenuItem>MTG Card Rank</MenuItem>
        </MenuList>
        <Divider />
        <MenuList className={classes.menuList}>
          {navItems.map(({ label, url }) => (
            <MenuItem button key={url}>
              <Typography component="div">
                <Link
                  className={classes.menuListLink}
                  color="primary"
                  variant="inherit"
                  to={url}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  {label}
                </Link>
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
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
