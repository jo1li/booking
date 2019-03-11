import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import classNames from 'classnames';
import _ from 'lodash';

// TODO: merge with HOComponents/TabbedList (which shouldn't be in HOComponets)
// once audio/video modal is updated
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

    return (
      <Fragment>
          <Tabs value={selectedTabIndex} onChange={this.changeTab} className={classes.tabList} >
            {
              _.map(tabNames, (label, idx) =>
                <Tab
                    disableRipple
                    label={label}
                    classes={{
                      root: classNames(classes.tab, classes.unselectedTab),
                      selected: classNames(classes.tab, classes.selectedTab),
                    }}
                    key={idx} />
              )
            }
          </Tabs>
        {
          children[selectedTabIndex]
        }
      </Fragment>
    );
  }
}
