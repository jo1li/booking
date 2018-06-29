import React, { Component } from 'react';
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import { Save, Close } from './icons';
import Button from './form/Button';
import RaisedButton from './form/RaisedButton';
import Grid from '@material-ui/core/Grid';

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
                            Cancel
                        </Button>
                        <RaisedButton
                            type="submit"
                            onClick={onClickConfirm}
                        >
                            <Save />
                            Confirm
                        </RaisedButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(CancelConfirm);