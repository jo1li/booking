import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import _ from 'lodash';

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
    }) => {
      paperProps = _.merge({classes: {root: classes.root}}, paperProps);

      return <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={paperProps}
      >
        <div className={classes.iconContainer}>
          <CloseComponent onClick={close} />
        </div>
          {children}
      </Dialog>
}

DialogBase.defaultProps = {
  fullScreen: false
}

export default DialogBase;
