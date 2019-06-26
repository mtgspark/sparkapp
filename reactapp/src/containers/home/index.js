import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Searchbar from '../../components/searchbar'
import SearchResults from '../../components/search-results'
import FeaturedList from '../../components/featured-list'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const Home = ({ searchTerm }) => {
  const classes = useStyles()

  return (
    <>
      <Searchbar />
      <SearchResults />
      {!searchTerm && (
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Welcome to MTG Card Rank
          </Typography>
          <Typography component="p">
            Start by searching for a particular list. eg. "standard", "edh",
            "The best cards in magic"
          </Typography>
        </Paper>
      )}
      {!searchTerm && <FeaturedList />}
    </>
  )
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(Home)
