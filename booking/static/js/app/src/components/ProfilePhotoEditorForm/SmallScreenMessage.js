import React, { Component } from 'react';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import Typography from '@material-ui/core/Typography';

const TIME_TO_HIDE_HELP = 5; // seconds
const TIME_TO_REMOVE_FROM_EVENT_HANDLING = 0.2; // seconds

class SmallScreenMessage extends Component {
  state = { isVisible: true, isRemoved: false };

  componentWillMount(props) {
    autoBind(this);
    setTimeout(this.hide, TIME_TO_HIDE_HELP * 1000);
  }

  hide() {
    this.setState({isVisible: false});
    setTimeout(this.remove, TIME_TO_REMOVE_FROM_EVENT_HANDLING * 1000);
  }

  remove() {
    this.setState({isRemoved: true});
  }

  render() {
    const { classes } = this.props;
    const { isVisible, isRemoved } = this.state;

    if(isRemoved) return null;

    return (
      <div
          className={classNames(isVisible ? null : classes.hidden, classes.smallScreenMessageWrapper)}
          onClick={this.remove}
          onTouchStart={this.remove}>
        <Typography variant="body1" className={classes.smallScreenMessage}>
          Pinch and zoom to set the visible area of the image.
        </Typography>
      </div>
    );
  }
}

export default SmallScreenMessage;
