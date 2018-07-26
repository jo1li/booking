import React, { Fragment } from 'react';
import { compose } from 'redux'
import FabButton from './FabButton';
import Button from '../Button';
import Hidden from '@material-ui/core/Hidden';
import _ from 'lodash';
import withWidth from '@material-ui/core/withWidth';

let IconButton = props => {
    const { mobileText } = props;
    props = _.omit(props, 'mobileText');

    return (
        <Fragment>
          <Hidden smUp >
            <Button  variant="outlined" {...props}>
                {props.children}
                { mobileText }
            </Button>
          </Hidden>
            <Hidden xsDown >
              <FabButton {...props}>
                  {props.children}
              </FabButton>
          </Hidden>
        </Fragment>
    )
}

IconButton = withWidth()(IconButton);

const FabIconButton = Icon => props =>
    <IconButton {...props}>
        <Icon />
    </IconButton>

export default FabIconButton;
