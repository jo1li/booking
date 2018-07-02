import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const InputButtons = (props) => {
    const {
        children,
        classes
    } = props;

    const fullWidth = 12;
    const count = React.Children.count(children);

    const mediumInput = fullWidth - count;
    const smallInput = mediumInput - Math.floor(count * 0.5);

    const mediumButtons = fullWidth - mediumInput;
    const smallButtons = fullWidth - smallInput;

    return (
        <Fragment>
          <Grid item xs={12} sm={smallInput} md={mediumInput} lg={11}>
                <Field
                  {...props}
                />
            </Grid>
            <Grid item xs={12} sm={smallButtons} md={mediumButtons} lg={1}>
               <Grid
                  container
                  justify="flex-end"
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

export default withStyles(styles)(InputButtons);