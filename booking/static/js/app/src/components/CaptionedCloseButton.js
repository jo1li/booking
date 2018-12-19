import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Close } from '../components/icons';

// TODO: move those styles into jss
const CloseComponent = (props) => {
  const { color, onClick, className } = props;
  return (
    <ButtonBase
        color={color}
        onClick={onClick}
        className={className}
        style={{backgroundColor: 'black', fontSize: '16px', fontWeight: 'lighter', padding: '16px 24px', paddingLeft: '64px', zIndex: 1,}}>
      <Close height={32} width={32} style={{position: 'absolute', top: '11px', left: '16px'}}/> Close
    </ButtonBase>
  );
};

export default CloseComponent;
