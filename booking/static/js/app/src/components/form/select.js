import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';

import theme from '../../theme';
import { ExpandMore } from '../icons';

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
          >
          <option value="" disabled>
              {placeholder}
          </option>
           {
              items.map(child => {
                  const placeholder = _.isObject(child) ? child.placeholder : child;
                  const value = _.isObject(child) ? child.value : child;
                  return <option key={value} value={value}>{placeholder}</option>
                }
              )
            }
      </Select>
    )
  }

export default withStyles(styles)(ReduxFormSelect);
