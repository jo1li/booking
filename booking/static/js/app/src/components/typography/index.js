import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Display1 = ({ children, className }) =>
    <Typography
        variant="display1"
        className={className}
    >
        { children }
    </Typography>

export const Title = ({ children, className }) =>
    <Typography
        variant="title"
        className={className}
    >
        { children }
    </Typography>

export const Caption = ({ children }) => <Typography variant="caption">{ children }</Typography>
export const H6 = ({ children }) => <Typography variant="h6">{ children }</Typography>
