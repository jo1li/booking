import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
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
    return (
      <Fragment>
        <Tabs value={selectedTabIndex} onChange={this.changeTab} >
          {
            _.map(tabNames, (label, idx) =>
              <Tab disableRipple label={label} className={classes.tab} key={idx} />
            )
          }
        </Tabs>
        { children[selectedTabIndex] }
      </Fragment>
    );
  }
}
