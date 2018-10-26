import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    minHeight: 0,
    opacity: 0,
    transition: 'all 0.2s',
    '&.visible': {
        opacity: 1,
        minHeight: '22px',
    }
  }
});

const ErrorDisplay = ({
    error,
    touched,
    classes: {
        container,
    }
  }) => (
    <div className={classNames({
            "error": true,
            [container]: true,
            'visible': touched && error
        })}
    >
        <span>
            {error}
        </span>
    </div>
  )

export default withStyles(styles)(ErrorDisplay);
