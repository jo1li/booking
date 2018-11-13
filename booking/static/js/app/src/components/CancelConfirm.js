import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CheckCircle } from './icons';
import Button from './form/Button';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from './form/ProgressIndicators';

const styles = theme => ({
  buttonContainer: {
    textAlign: 'right',
  },
  wideButton: {
    minWidth: '105px',
    margin: theme.spacing.unit,
  },
  // TODO: find out hover behavior and handle material-ui style
  saveButton: {
    marginRight: 0, // To line up flush with the container's padding
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  cancelButton: {
    border: 'none', // TODO: is there a material-ui api way to do this, no stomping around with css?
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  centerer: {
    paddingTop: '12px',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
});

const CancelConfirm = (props) => {
  const {
    classes,
    onClickCancel,
    onClickConfirm,
    isLoading,
    success,
    disabled
  } = props;

  return (
    <Grid className={classes.buttonContainer} item xs={12} sm={12} md={12} lg={12}>
      <Button onClick={onClickCancel} className={`${classes.wideButton} ${classes.cancelButton}`}>
        { !success ? 'Cancel' : 'Close' }
      </Button>
      <Button
          type="submit"
          onClick={onClickConfirm}
          className={`${classes.wideButton} ${classes.saveButton}`}
          disabled={disabled} >
        {/* TODO refactor this, this is awful*/}
        { isLoading ? <CircularProgress /> : null }
        { !isLoading && success ? <CheckCircle /> : null }
        { !isLoading && !success ? <Fragment>Save</Fragment> : null }
      </Button>
    </Grid>
  );
}

const CenteredCancelConfirm = (props) => {
  return (
    <div
        className={`
          ${props.classes.centerer}
          ${props.className || ''}
        `}>
      <CancelConfirm {...props} />
    </div>
  );
}


CancelConfirm.defaultProps = {
    disabled: false
}

export default withStyles(styles)(CenteredCancelConfirm);
