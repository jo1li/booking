import React from 'react';
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    width: '24px',
    height: '24px',
  },
  spaceLeft: {
    marginLeft: theme.spacing.unit
  },
  spaceRight: {
    marginRight: theme.spacing.unit
  }
});

let IconImg = (props) => {
    const { classes, spaceLeft, spaceRight, alt } = props;
    props = _.omit(props, ['classes', 'spaceLeft', 'spaceRight']);

    const className = classNames(classes.container, {
        [classes.spaceLeft]: spaceLeft,
        [classes.spaceRight]: spaceRight,
    });

    return (
        <img
            className={className}
            alt={alt}
            {...props}
        />
    )
}

IconImg = withStyles(styles)(IconImg)

const IconImgContainer = ({src, alt}) => props => <IconImg src={src} alt={alt} {...props} />

export default IconImgContainer