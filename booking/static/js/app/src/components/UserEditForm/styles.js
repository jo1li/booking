import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    position: 'relative',
    top: '-15px',
    marginLeft: '20px',
    '&:first-child': {
      marginLeft: '0px',
    }
  },
  caption: {
      marginTop: '20px',
  },
  captionTop: {
      margin: '0 12px',
      padding: '12px 0px 5px!important',
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
});

export default styles;
