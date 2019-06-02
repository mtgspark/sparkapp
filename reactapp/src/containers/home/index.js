import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Searchbar from '../../components/searchbar'
import SearchResults from '../../components/search-results'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <>
      <Searchbar />
      <SearchResults />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Welcome to MTG Card Rank
        </Typography>
        <Typography component="p">
          Start by searching for a particular list. eg. "standard", "edh", "The
          best cards in magic"
        </Typography>
      </Paper>
    </>
  )
}

export default Home
