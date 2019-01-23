import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DropdownArrow } from '../icons';

const DropdownIndicator = ({className, theme}) => (
  <DropdownArrow className={className || ''} color={theme.palette.grey[600]} size={20} />
);

export default withStyles({}, {withTheme: true})(DropdownIndicator);
