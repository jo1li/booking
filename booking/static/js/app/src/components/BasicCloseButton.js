import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '../components/icons';

const CloseComponent = (props) => {
  const { theme, onClick } = props;
  return (
    <Close
      onClick={onClick}
      stroke={theme.palette.primaryTonal[500]}/>
  );
};

export default withStyles({}, {withTheme: true})(CloseComponent);
