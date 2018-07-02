import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { ExpandMore } from '../icons';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  underline: {
    '&:after': {
        borderBottom: `2px solid ${theme.palette.secondary.dark}`,
    },
    '&:before': {
        borderBottom: `2px solid ${theme.palette.grey[200]}`,
    },
  },
  menuItem: {
    '&:disabled': {
      opacity: '0.4',
    }
  }
});

// TOOD add docs on redux form  and material ui
// https://redux-form.com/6.7.0/docs/api/form.md/
const ReduxFormSelect = ({
  input,
  label,
  placeholder,
  classes,
  className,
  items,
  IconComponent,
  meta: { touched, error },
  ...custom
}) => {
  return (
      <Select
          className={className}
          classes={{
            icon: classes.icon,
            underline: classes.underline,
          }}
          IconComponent={IconComponent || ExpandMore}
          fullWidth
          {...input}
          {...custom}
          displayEmpty
          >
          <MenuItem value="" disabled classes={{root: classes.menuItem}}>
            {/* temporary work around becuase the disabled prop above is not activating styles properly */}
            <div style={{opacity: '0.4'}}>
              {placeholder}
            </div>
          </MenuItem>
           {
              items.map(child => {
                  const placeholder = _.isObject(child) ? child.placeholder : child;
                  const value = _.isObject(child) ? child.value : child;
                  return <MenuItem key={value} value={value}>{placeholder}</MenuItem>
                }
              )
            }
      </Select>
    )
  }

export default withStyles(styles)(ReduxFormSelect);
