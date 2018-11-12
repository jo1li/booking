import React, { Fragment } from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ReduxFormField from '../HOComponents/ReduxFormField';
import Error from '../form/Error';

const styles = theme => ({
    underline: {
      '&:after': {
          borderBottom: `2px solid ${theme.palette.secondary.dark}`,
      },
      '&:before': {
          borderBottom: `2px solid ${theme.palette.grey[200]}`,
      },
    }
});

const InputInternal = (props) => {
    const {
        classes,
        error,
        touched,
        ...remainingProps,
    } = props;

    return (
        <Fragment>
            <Input
                classes={classes}
                {...remainingProps} />
            <Error touched={true} error={error} />
        </Fragment>
    );
}

export default compose(
    ReduxFormField,
    withStyles(styles)
)(InputInternal);
