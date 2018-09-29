import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = {
  fullList: {
    width: 'auto',
  },
};

class NavigationMobileMenu extends React.Component {
  render() {
    const { classes, open, toggleFunction } = this.props;
    const fullList = (
      <div className={classes.fullList}>
        <List>
          <ListItem button>
            <ListItemText primary="Venues" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Bookings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <SwipeableDrawer
          anchor="top"
          open={open}
          onClose={toggleFunction(false)}
          onOpen={toggleFunction(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={toggleFunction(false)}
            onKeyDown={toggleFunction(false)}
          >
            {fullList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(NavigationMobileMenu);