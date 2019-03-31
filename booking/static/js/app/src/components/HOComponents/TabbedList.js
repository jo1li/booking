import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
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

    // flattening allows some children to be individuals, and some to come
    // from a map and be nested under an array
    const tabItems = _.flattenDeep(children);

    return (
      <Fragment>
          <Tabs value={selectedTabIndex} onChange={this.changeTab} className={classes.tabList} >
            {
              _.map(tabNames, (label, idx) =>
                <Tab
                    disableRipple
                    label={<Typography variant='body2'>{label}</Typography>}
                    classes={{
                      root: classNames(classes.tab, classes.unselectedTab),
                      selected: classNames(classes.tab, classes.selectedTab),
                    }}
                    key={idx} />
              )
            }
          </Tabs>
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
