import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CheckCircle } from './icons';
import Button from './form/Button';
import RaisedButton from './form/RaisedButton';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from './form/ProgressIndicators';

const styles = theme => ({
  buttonContainer: {
    textAlign: 'center',
  },
  wideButton: {
    minWidth: '137px',
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
  } = props;

  return (
    <Grid className={classes.buttonContainer} item xs={12} sm={12} md={12} lg={12}>
      <Button onClick={onClickCancel} className={classes.wideButton}>
        { !success ? 'Cancel' : 'Close' }
      </Button>
      <RaisedButton
          type="submit"
          onClick={onClickConfirm}
          className={classes.wideButton} >
        {/* TODO refactor this, this is awful*/}
        { isLoading ? <CircularProgress /> : null }
        { !isLoading && success ? <CheckCircle /> : null }
        { !isLoading && !success ? <Fragment>Save</Fragment> : null }
      </RaisedButton>
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

export default withStyles(styles)(CenteredCancelConfirm);
