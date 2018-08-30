import React, { Component, Fragment } from 'react';
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
  buttonContainer: {
    textAlign: 'center',
  },
  wideButton: {
    minWidth: '137px',
  },
});

class CancelConfirm  extends Component {
    render() {
        const {
            classes,
            onClickCancel,
            onClickConfirm,
            isLoading,
            success,
        } = this.props;

        return (
            <Grid container spacing={24}>
                <Grid className={classes.buttonContainer} item xs={12} sm={12} md={12} lg={12}>
                    <Button onClick={onClickCancel} className={classes.wideButton}>
                        <Close />
                        { !success ? 'Cancel' : 'Close' }
                    </Button>
                    <RaisedButton
                        type="submit"
                        onClick={onClickConfirm}
                        className={classes.wideButton}
                    >

                        {/* TODO refactor this, this is awful*/}
                        { isLoading ? <CircularProgress /> : null }
                        { !isLoading && success ? <CheckCircle /> : null }
                        { !isLoading && !success ?
                            <Fragment>
                                <Save spaceRight />
                                Save
                            </Fragment>: null
                        }
                    </RaisedButton>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(CancelConfirm);
