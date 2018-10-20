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
        ...remainingProps
    } = props;

    const fullWidth = 12;
    const count = React.Children.count(children);

    const mediumInput = fullWidth - count;
    const smallInput = mediumInput - Math.floor(count * 0.5);

    const mediumButtons = fullWidth - mediumInput;
    const smallButtons = fullWidth - smallInput;

    console.log("InputButtons", remainingProps)

    return (
      <Fragment>
        <Reverse If={isMobile}>
          <Grid item xs={12} sm={smallInput} md={mediumInput} lg={10}>
            <Field {...remainingProps} />
          </Grid>
          <Grid item xs={12} sm={smallButtons} md={mediumButtons} lg={2} className={classes.buttonsContainer}>
            <Grid
                container
                justify={isMobile ? "center" : "flex-end"}
                wrap="nowrap"
                direction="row" >
              {
                React.Children.map(children, child =>
                    React.cloneElement(child)
                )
              }
            </Grid>
          </Grid>
        </Reverse>
      </Fragment>
    )
}

export default withStyles(styles)(InputButtons);
