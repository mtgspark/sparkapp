import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {
//   Paper,
//   InputBase,
//   Divider,
//   IconButton
// } from '@material-ui/core'
import Searchbar from '../../components/searchbar';
import { toggleMenu } from '../../modules/app';
// import * as routes from '../../routes'

const Home = ({ app: { isMenuOpen }, toggleMenu, ...props }) => (
  <>
    <h1>Home</h1>

    <Searchbar />

    <textarea>
      {JSON.stringify(props.lists)}
    </textarea>

    <textarea>
      {JSON.stringify(props.analytics)}
    </textarea>
  </>
)

const mapStateToProps = ({ app, lists, analytics }) => ({
  app,
  lists,
  analytics
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleMenu 
  },
  dispatch
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
