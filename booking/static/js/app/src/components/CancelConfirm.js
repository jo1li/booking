import React, { Component, Fragment } from 'react';
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import {
    Save,
    Close,
    CheckCircle
} from './icons';
import Button from './form/Button';
import RaisedButton from './form/RaisedButton';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from './form/ProgressIndicators';

const styles = theme => ({
  contaner: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  buttonContainer: {
    textAlign: 'center',
  }
});

class CancelConfirm  extends Component {
    render() {
        const {
            classes,
            children,
            onClickCancel,
            onClickConfirm,
            isLoading,
            success,
        } = this.props;

        return (
            <div className={classes.contaner}>
                <Grid container spacing={24}>
                    <Grid item xs={12} lg={12}>
                        {children}
                    </Grid>
                    <Grid className={classes.buttonContainer} item xs={12} sm={12} md={12} lg={12}>
                        <Button onClick={onClickCancel}>
                            <Close />
                            { !success ? 'Cancel' : 'Close' }
                        </Button>
                        <RaisedButton
                            type="submit"
                            onClick={onClickConfirm}
                        >

                            {/* TODO refactor this, this is awful*/}
                            { isLoading ? <CircularProgress /> : null }
                            { !isLoading && success ? <CheckCircle /> : null }
                            { !isLoading && !success ?
                                <Fragment>
                                    <Save />
                                    Confirm
                                </Fragment>: null
                            }
                        </RaisedButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CancelConfirm);