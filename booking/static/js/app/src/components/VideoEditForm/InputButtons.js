import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Reverse from '../HOComponents/Reverse';

const InputButtons = (props) => {
    const {
        children,
        classes,
        isMobile,
    } = props;

    const fullWidth = 12;
    const count = React.Children.count(children);

    const mediumInput = fullWidth - count;
    const smallInput = mediumInput - Math.floor(count * 0.5);

    const mediumButtons = fullWidth - mediumInput;
    const smallButtons = fullWidth - smallInput;

    // TODO: Magic numbers, and not using variables above
    return (
      <Fragment>
        <Reverse If={isMobile}>
          <Grid item xs={12} sm={smallInput} md={8} lg={8}>
            <Field {...props} />
          </Grid>
          <Grid item xs={12} sm={smallButtons} md={4} lg={4}>
            <Grid
                container
                justify="flex-end"
                direction="row" >
              {
                React.Children.map(children, child =>
                    React.cloneElement(child, {className: `${classes.button} ${child.props.className}`})
                )
              }
            </Grid>
          </Grid>
        </Reverse>
      </Fragment>
    )
}

export default withStyles(styles)(InputButtons);
