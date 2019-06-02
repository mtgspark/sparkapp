import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const PageFooter = () => {
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
      <p className="brand">&copy; Spark</p>
    </footer>
  )
}

export default PageFooter
