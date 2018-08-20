import React, { Fragment } from 'react';
import { compose } from 'redux'
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Reverse from '../HOComponents/Reverse';
import styles from './styles';

const InputButtons = (props) => {
    const {
        children,
        classes,
        buttonsAbove,
    } = props;

    const isNotMobile = isWidthUp('sm', props.width)
    const fullWidth = 12;
    const count = React.Children.count(children);

    const mediumInput = fullWidth - count;
    const smallInput = mediumInput - Math.floor(count * 0.5);

    const mediumButtons = fullWidth - mediumInput;
    const smallButtons = fullWidth - smallInput;

    return (
        <Fragment>
            <Reverse If={buttonsAbove}>
                <Grid item xs={12} sm={smallInput} md={mediumInput} lg={10}>
                    <Field
                    {...props}
                    />
                </Grid>
                <Grid item zeroMinWidth xs={12} sm={smallButtons} md={mediumButtons} lg={2}>
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
            </Reverse>
        </Fragment>
    )
}

export default compose(
    withStyles(styles),
    withWidth(),
)(InputButtons);