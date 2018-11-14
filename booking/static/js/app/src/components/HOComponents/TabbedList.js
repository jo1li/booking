import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

export default class TabbedList extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { selectedTabIndex: 0 };
  }

  changeTab(event, value) {
    this.setState({ selectedTabIndex: value });
  }

  render() {
    const { children, classes, tabNames } = this.props;
    const { selectedTabIndex } = this.state;

    const header = children[0];
    // flattening allows some children to be individuals, and some to come
    // from a map and be nested under an array
    const tabItems = _.flattenDeep(children.slice(1));

    return (
      <Fragment>
        { header }
        <Grid item className={`${classes.captionTop} ${classes.fixedHeight}`} xs={12} sm={12} md={12} lg={12}>
          <Tabs value={selectedTabIndex} onChange={this.changeTab} >
            {
              _.map(tabNames, (label, idx) =>
                <Tab disableRipple label={label} className={classes.tab} key={idx} />
              )
            }
          </Tabs>
        </Grid>
        {
          React.cloneElement(
            tabItems[selectedTabIndex],
            { goToTab: (tabIdx) => this.changeTab(null, tabIdx) },
          )
        }
      </Fragment>
    );
  }
}
