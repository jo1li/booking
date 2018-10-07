import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import SlotListItem from './SlotListItem';
import * as SlotActions from '../../actions/slots';

class SlotsList extends Component {
  componentWillMount() {
    const {
      profile,
      getArtistSlots,
    } = this.props;

    getArtistSlots({artistId: profile.id});
  }

  render() {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th colSpan="2">Upcoming Events</th>
            <th colSpan="2" className="booked">Booked on Opus <img src="{% static 'images/bookmark-copy.png' %}" alt=""/></th>
          </tr>
        </thead>
        <tbody>
          {_.map(this.props.slots, (slot, idx) => <SlotListItem {...slot} key={idx}/>)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state, props) => ({
  slots: state.slots,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistSlots: SlotActions.getArtistSlots,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsList);
