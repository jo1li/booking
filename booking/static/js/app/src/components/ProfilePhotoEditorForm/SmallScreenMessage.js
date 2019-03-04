import React, { Component } from 'react';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import Typography from '@material-ui/core/Typography';

const TIME_TO_HIDE_HELP = 5; // seconds

class SmallScreenMessage extends Component {
  state = { isVisible: true };

  componentWillMount(props) {
    autoBind(this);
    setTimeout(this.hide, TIME_TO_HIDE_HELP * 1000);
  }

  hide() {
    this.setState({isVisible: false});
  }

  render() {
    const { classes } = this.props;
    return (
      <div
          className={classNames(this.state.isVisible ? null : classes.hidden, classes.smallScreenMessageWrapper)}
          onClick={this.hide}>
        <Typography variant="body1" className={classes.smallScreenMessage}>
          Pinch and zoom to set the visible area of the image.
        </Typography>
      </div>
    );
  }
}

export default SmallScreenMessage;
