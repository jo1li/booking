import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import NativeSelect from '@material-ui/core/NativeSelect';
import { createMuiTheme } from '@material-ui/core/styles';

// TOOD add docs on redux form  and material ui
// https://redux-form.com/6.7.0/docs/api/form.md/
const ReduxFormSelect = ({
  input,
  label,
  placeholder,
  className,
  items,
  IconComponent,
  meta: { touched, error },
  ...custom
}) => {
  return (
      <NativeSelect
          className={className}
          IconComponent={IconComponent}
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
                  return <option value={value}>{placeholder}</option>
                }
              )
            }
      </NativeSelect>
    )
  }

export default ReduxFormSelect;
