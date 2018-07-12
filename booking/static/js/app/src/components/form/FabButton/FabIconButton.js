import React from 'react';
import FabButton from './FabButton';

const FabIconButton = Icon => props =>
    <FabButton {...props}>
        <Icon />
    </FabButton>

export default FabIconButton;