import React from 'react';
// import PropTypes from 'prop-types';
import Button from '../Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    height: '44px',
    minHeight: '44px',
    width: '44px',
    minWidth: '44px',
    borderRadius: '100%',
    borderColor: theme.palette.secondary.main,
    '&:disabled': {
        opacity: '0.2',
        color: theme.palette.secondary.main,
    }
  },
});

const FabButton = (props) => {
    const {
        classes,
        children,
    } = props;

    return (
        <Button
            variant="outlined"
            size="small"
            {...props}
            className={`${classes.button} ${props.className}`}
        >
            {children}
        </Button>
    )
}

export default withStyles(styles)(FabButton);