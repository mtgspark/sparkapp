import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Paper, Container, Grid, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Searchbar from '../../components/searchbar'
import { toggleMenu } from '../../modules/app'
// import * as routes from '../../routes'

const Card = ({ app: { isMenuOpen }, toggleMenu, ...props }) => (
  <>
    <Searchbar />

    <Container maxWidth="lg">
      <p>
        <a href="/" title="">
          <ArrowBackIcon /> back to [xyz]
        </a>
      </p>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <figure className="card-wrapper text-center" align="center">
            <img src="https://via.placeholder.com/400x560" alt="mtg card" />
          </figure>
        </Grid>
        <Grid item xs={12} sm={7}>
          <h1>[cardname]</h1>
          <div className="card-rating">
            <p>[rating]</p>
            <p>
              <Button className="" variant="contained" color="primary">
                Rate
              </Button>
              <Button className="" variant="outlined" color="">
                Save
              </Button>
            </p>
          </div>
          <div className="card-props">
            <p>[cmc cost]</p>
            <p>[type]</p>
            <p>[abilities]</p>
            <p>[flavour]</p>
            <p>[edition, author, set number]</p>
          </div>
          <hr />
          <div className="card-discussion">[comments]</div>
        </Grid>
      </Grid>
    </Container>
  </>
)

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
)(Card)
