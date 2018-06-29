import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    position: 'relative',
    top: '-15px',
  },
});

const AdjustButton = (props) => {
    const {
        className,
        children
    } = props;

    return React.Children.map(children, child => {
      return React.cloneElement(child, { className: className })
    })
}

export default withStyles(styles)(AdjustButton);

const WrapBindEvents = WrappedComponent => props => {
    console.log("WrappedComponent!!!!! props", props)
        return (
            <BindEvents>
                <WrappedComponent {...props} />
            </BindEvents>
        )
    }


export default WrapBindEvents;