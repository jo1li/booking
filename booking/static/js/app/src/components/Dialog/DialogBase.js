import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
  reverseColorsDialog: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
    fontWeight: 'lighter', // looks to heavy otherwise TODO: not propagating
  },
  iconContainer: {
    position: 'absolute',
    top: theme.spacing.unit * 2.5,
    right: theme.spacing.unit * 2.5,
    zIndex: 1, // Content of the dialog can overlap this button
    cursor: 'pointer',
  },
  reverseColorsIconContainer: {
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,
    },
  }
});

const DialogBase = ({
      children,
      CloseComponent,
      classes,
      paperProps,
      fullScreen,
      fullWidth,
      maxWidth,
      isOpen,
      close,
      reverseColors,
      theme,
    }) => {

      // Set classes if reversing color scheme

      if(reverseColors) {
        paperProps = _.merge({classes: {root: classes.reverseColorsDialog}}, paperProps);
      }

      const iconContainerClass = reverseColors ?
        classes.reverseColorsIconContainer :
        classes.iconContainer;

      return <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
        PaperProps={paperProps}
      >
        <div className={iconContainerClass}>
          <CloseComponent
            color={theme.palette.secondary.main}
            onClick={close}
          />
        </div>
          {children}
      </Dialog>;
}

DialogBase.defaultProps = {
  fullScreen: false
}

export default withStyles(styles, { withTheme: true })(DialogBase);
