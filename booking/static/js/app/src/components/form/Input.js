import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Input from '@material-ui/core/Input';
import { createMuiTheme } from '@material-ui/core/styles';
import ReduxFromField from '../HOComponents/ReduxFormField';

export default compose(ReduxFromField)(Input);