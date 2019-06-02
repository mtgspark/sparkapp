import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMenu } from '../../modules/app';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    InputBase,
    Divider,
    IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import * as routes from '../../routes'

const navItems = [
    {
      label: 'Home',
      url: routes.home
    },
    {
      label: 'Browse Lists',
      url: routes.lists
    }
]

const PageHeader = ({ app: { isMenuOpen }, toggleMenu }) => {
  
    const useStyles = makeStyles({
      header: {
        // padding: '2px 2px 2px 24px',
        // borderRadius: '3rem',
        // margin: '1rem auto',
        // display: 'flex',
        // alignItems: 'center',
        // maxWidth: 600,
      }
    });
    
    const classes = useStyles();
  
    return (
        <header className="header">

            <Grid container>
                <Grid item xs={6} align="left">
                    <Link to={routes.home}>[spark]</Link>
                </Grid>
                <Grid item xs={6} align="right">
                    <Button onClick={() => toggleMenu() }>
                        <MenuIcon />
                        Menu
                    </Button>        
                </Grid>
            </Grid>
            
            <Drawer anchor="right" open={isMenuOpen} onClose={() => toggleMenu() }>
                <List>
                    {
                    navItems.map(({ label, url }) => (
                        <ListItem button key={url}>
                        <Link to={url}>
                            <ListItemText primary={label} />
                        </Link>
                        </ListItem>
                    ))
                    }
                </List>
            </Drawer>
            
        </header>
    );
}

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
)(PageHeader)