import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

const SearchBar = () => {
  
    const useStyles = makeStyles({
      root: {
        padding: '2px 2px 2px 24px',
        borderRadius: '3rem',
        margin: '1rem auto',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
      },
      input: {
        marginLeft: 8,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        width: 1,
        height: 28,
        margin: 4,
      },
    });
    
    const classes = useStyles();
  
    return (
      <Paper className={classes.root}>
        <InputBase className={classes.input} placeholder="Search cards" autoFocus={true} autoComplete="false" />
        <IconButton color="primary" className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="Settings" onClick={()=>console.log('toggle search options')}>
          <SettingsIcon />
        </IconButton>
      </Paper>
    );
}

export default SearchBar;