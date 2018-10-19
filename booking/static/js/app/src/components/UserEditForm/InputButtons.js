import React, { Fragment } from 'react';
import { compose } from 'redux'
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styles from './styles';

const InputButtons = (props) => {
    const {
        children,
        classes,
        ...remainingProps,
    } = props;

    const isNotMobile = isWidthUp('sm', props.width)
    const fullWidth = 12;
    const count = React.Children.count(children);

    const smallInput = fullWidth - count - Math.floor(count * 0.5);
    const smallButtons = fullWidth - smallInput;

    return (
        <Fragment>
          <Grid item xs={12} sm={smallInput} md={9} lg={9}>
                <Field
                  {...remainingProps}
                />
            </Grid>
            <Grid item zeroMinWidth xs={12} sm={smallButtons} md={3} lg={3}>
               <Grid
                  container
                  justify={isNotMobile ? "flex-end" : "center"}
                  direction="row"
                >
                  {
                    React.Children.map(children, child =>
                        React.cloneElement(child, {className: classes.button})
                    )
                  }
              </Grid>
            </Grid>
        </Fragment>
    )
}

export default compose(
    withStyles(styles),
    withWidth(),
)(InputButtons);
