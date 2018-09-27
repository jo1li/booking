import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import autoBind from 'react-autobind';
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
  icon: {
    colorPrimary: theme.palette.primary.main
  },
});

class DialogBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    autoBind(this)
  };

  componentWillMount() {
    this.props.onMount && this.props.onMount(this.open, this.close);
  }

  open() {
    this.setState({ open: true });
  };

  close() {
    this.setState({ open: false });
  };

  render() {
    const {
      children,
      classes,
      fullScreen,
      fullWidth,
      maxWidth,
    } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { openDialog: this.open, closeDialog: this.close }));

    return (
        <Dialog
          fullScreen={fullScreen}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <div className={classes.iconContainer}>
            <Close
              color="secondary"
              onClick={this.close}
            />
          </div>
            {childrenWithProps}
        </Dialog>
    );
  }
}

DialogBase.defaultProps = {
  fullScreen: false
}

export default withStyles(styles)(DialogBase);
