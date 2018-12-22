import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '../components/icons';

const styles = theme => ({
  wrapper: {
    backgroundColor: 'black',
    fontSize: '16px',
    fontWeight: 'lighter',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    paddingLeft: theme.spacing.unit * 8,
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    top: '11px',
    left: theme.spacing.unit * 2,
  },
});

const CloseComponent = (props) => {
  const { color, onClick, classes } = props;
  return (
    <ButtonBase
        color={color}
        onClick={onClick}
        className={classes.wrapper}>
      <Close height={32} width={32} className={classes.content}/> Close
    </ButtonBase>
  );
};

export default withStyles(styles)(CloseComponent);
