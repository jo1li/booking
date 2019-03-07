import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const SHADOW_HEIGHT = 10;

const styles = (theme) => ({
  container: {
    overflowY: 'scroll',
  },
  topShadow: {
    zIndex: 100,
    position: 'absolute',
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))',
    left: 0,
    right: 0,
    height: SHADOW_HEIGHT,
  },
  bottomShadow: {
    zIndex: 100,
    position: 'absolute',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))',
    left: 0,
    right: 0,
    height: SHADOW_HEIGHT,
  }
});

class ScrollShadows extends Component {
  constructor() {
    super();
    autoBind(this);
  }

  state = {
    // Don't show top on load
    topPosition: -(SHADOW_HEIGHT + 1),
    // Assume it's too big for the screen on load until we have a much shorter
    // container that uses this.
    bottomPosition: 0,
  }


  positionScrollShadows(event) {
    const container = this.refs.container;
    if(!container) {
      return;
    }

    const scrollBottom = container.scrollTop + container.offsetHeight;

    const distanceFromTop = container.scrollTop;
    const distanceFromBottom = container.scrollHeight - scrollBottom;

    this.setState({
      topPosition: Math.min(distanceFromTop - SHADOW_HEIGHT, 0),
      bottomPosition: Math.min(distanceFromBottom - SHADOW_HEIGHT, 0),
    });

  }

  render() {
    const { children, classes, className } = this.props;
    return (
      <div className={classNames(classes.container, className)}
          ref='container'
          onScroll={this.positionScrollShadows}>
        <div
            className={classes.topShadow}
            style={{ top: this.state.topPosition }} />
        {children}
        <div
            className={classes.bottomShadow}
            style={{ bottom: this.state.bottomPosition }} />
      </div>
    );
  }
}

export default withStyles(styles)(ScrollShadows);
