import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    height: '44px',
    minHeight: '44px',
    width: '44px',
    minWidth: '44px',
  },
});

const FabButton = (props) => {
    const {
        classes,
        children,
    } = props;

    return (
        <Button
            outlined
            variant="fab"
            size="small"
            {...props}
            className={`${classes.button} ${props.className}`}
        >
            {children}
        </Button>
    )
}

export default withStyles(styles)(FabButton);