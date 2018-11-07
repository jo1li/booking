import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Display1 = ({ children, className }) =>
    <Typography
        variant="display1"
        className={className}
    >
        { children }
    </Typography>


export const Headline = ({ children, className }) =>
    <Typography
        variant="headline"
        className={className}
    >
        { children }
    </Typography>

export const Caption = ({ children }) => <Typography variant="caption">{ children }</Typography>
