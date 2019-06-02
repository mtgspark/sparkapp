import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@material-ui/core'


const PageFooter = () => {
  
    const useStyles = makeStyles({
      footer: {
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
        <footer className="footer" align="center" color="">
            <p className="brand">&copy; Spark</p>
        </footer>
    );
}

export default PageFooter;