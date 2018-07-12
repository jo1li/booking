import React from 'react';
import DialogBase from './DialogBase';

const Dialog = WrappedComponent => props => {
        return (
            <DialogBase>
                <WrappedComponent {...props}/>
            </DialogBase>
        )
    }


export default Dialog;
