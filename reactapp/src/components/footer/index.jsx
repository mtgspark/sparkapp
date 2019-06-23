import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import withAuthProfile from '../../hocs/withAuthProfile'
import * as routes from '../../routes'

const PageFooter = ({ auth }) => {
  const useStyles = makeStyles({
    footer: {
      margin: '3rem 0 0 0',
      padding: '1rem 2rem',
      fontSize: '16px',
      background: 'hsl(250, 10%, 20%)',
      color: 'hsl(250, 40%, 70%)'
    }
  })

  const classes = useStyles()

  return (
    <footer className={classes.footer} align="right" color="">
      {auth.uid ? `You are logged in as ${auth.uid}` : 'You are not logged in'}
      <Link to={routes.admin}>&copy; Spark</Link>
    </footer>
  )
}

export default withAuthProfile(PageFooter)
