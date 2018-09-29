import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import UserIcon from 'react-feather/dist/icons/user';
import DownIcon from 'react-feather/dist/icons/chevron-down';
import ButtonBase from '@material-ui/core/ButtonBase';
import SliderIcon from 'react-feather/dist/icons/sliders';
import SignOutIcon from 'react-feather/dist/icons/log-out';
import NavigationMobileMenu from './NavigationMobileMenu';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    zIndex: '10'
  },
  grow: {
    flexGrow: 1,
  },
  avatarMenu: {
    borderRadius: 4,
    color: theme.palette.grey[600],
  },
  menuItem: {
    paddingRight: 32,
    fontSize: '1rem',
    color: theme.palette.grey[700],
    '& > svg': {
      paddingRight: 16
    }
  },
  avatar: {
    width: 42,
    height: 32,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.light,
    MozBoxShadow:    'inset 0 0 0 1px rgba(0,0,0,0.25)',
    WebkitBoxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)',
    BoxShadow:       'inset 0 0 0 1px rgba(0,0,0,0.25)'
  },
  destinations: {
    listStyle: 'none',
    color: theme.palette.grey[600],
    '& > li': {
      display: 'inline-block',
      padding: '0 auto'
    },
    '& > li:not(:first-child)': {
      marginLeft: theme.spacing.unit * 4,
    } 
  },
  title: {
    // display: 'none',
    // [theme.breakpoints.up('')]: {
      display: 'block',
    // },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionTablet: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class NavigationBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileDrawerOpen: false,
  };

  toggleMobileDrawer = (open) => () => {
    this.setState({mobileDrawerOpen: open});
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose} className={classes.menuItem}>
          <UserIcon size={20}/>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose} className={classes.menuItem}>
          <SliderIcon size={20}/>
          <p>Settings</p>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose} className={classes.menuItem}>
          <SignOutIcon size={20}/>
          <p>Sign Out</p>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose} className={classes.menuItem}>
          <p>Venues</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} className={classes.menuItem}>
          <p>Bookings</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} className={classes.menuItem}>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} className={classes.menuItem}>
          <p>Settings</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} className={classes.menuItem}>
          <p>Sign Out</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" elevation="0" color="inherit">
          <Toolbar>
            <Typography className={classes.title} variant="title" color="primary" style={{fontWeight: 400}} noWrap>
              Opus
            </Typography>
            <div className={classes.sectionDesktop}>
            <ul className={classes.destinations}>
              <li>
                <Typography variant="body1" color="inherit">
                  Venues
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="inherit">
                  Bookings
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="inherit">
                  Profile
                </Typography>
              </li>
            </ul>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <ButtonBase
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                className={classes.avatarMenu}
              >
                <div className={classes.avatar} 
                  style={{
                    backgroundImage: `url(${this.props.image})`,
                    backgroundSize: '100%'
                  }}
                ></div>
                <Typography color="inherit" variant="body1" noWrap style={{maxWidth: 150, paddingLeft: 8, paddingRight: 8}}>
                  {this.props.artist}
                </Typography>
                <DownIcon size={18} />
              </ButtonBase>
            </div>
            <div className={classes.sectionMobile}>
              <ButtonBase
                  aria-owns={isMenuOpen ? 'material-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.toggleMobileDrawer(true)}
                  // <Button onClick={toggleFunction(true)}>Open Top</Button>
                  color="inherit"
                  className={classes.avatarMenu}
                >
                  <div className={classes.avatar} 
                    style={{
                      backgroundImage: `url(${this.props.image})`,
                      backgroundSize: '100%'
                    }}
                  ></div>
                  <div className={classes.sectionDesktop}>
                    <Typography color="inherit" variant="body1" noWrap style={{maxWidth: 150, paddingLeft: 4}}>
                      {this.props.artist}
                    </Typography>
                  </div>
                  <DownIcon size={18} style={{paddingLeft: 4, paddingRight: 4, marginRight: -4}}/>
                </ButtonBase>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        <NavigationMobileMenu 
          open={this.state.mobileDrawerOpen}
          toggleFunction={this.toggleMobileDrawer}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NavigationBar);
