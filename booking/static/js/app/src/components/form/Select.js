import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import ButtonBase from '@material-ui/core/ButtonBase';
import DropdownIndicator from './DropdownIndicator';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';

const styles = theme => ({
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
    },
    ...theme.typography.body1,
  },
  root: {
    ...theme.typography.body1,
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
          classes={{ root: classes.root }}
          IconComponent={IconComponent || DropdownIndicator}
          fullWidth
          {...input}
          {...custom}
          displayEmpty
          >
          <MenuItem value="" disabled classes={{root: classNames(classes.menuItem)}}>
            {/* temporary work around becuase the disabled prop above is not activating styles properly */}
            <div style={{opacity: '0.4'}}>
              {placeholder}
            </div>
          </MenuItem>
           {
              items.map(child => {
                  const placeholder = _.isObject(child) ? child.placeholder : child;
                  const value = _.isObject(child) ? child.value : child;
                  return <MenuItem key={value} value={value} classes={{root: classNames(classes.menuItem)}}>{placeholder}</MenuItem>
                }
              )
            }
      </Select>
    )
  }

export default withStyles(styles)(ReduxFormSelect);
