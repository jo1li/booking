import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Close } from '../icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  iconContainer: {
    position: 'absolute',
    top: theme.spacing.unit * 2.5,
    right: theme.spacing.unit * 2.5,
    zIndex: 1,
    cursor: 'pointer',
  },
});

const DialogBase = ({
      children,
      classes,
      fullScreen,
      fullWidth,
      maxWidth,
      isOpen,
      close,
      theme,
    }) =>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <div className={classes.iconContainer}>
            <Close
              color={theme.palette.secondary.main}
              onClick={close}
            />
          </div>
            {children}
        </Dialog>

DialogBase.defaultProps = {
  fullScreen: false
}

export default withStyles(styles, { withTheme: true })(DialogBase);
