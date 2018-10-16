import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

// import { ARTIST_ONBOARDING } from '../../constants'


class ArtistOnboarding extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <div>
        <h1>React-generated onboarding.</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps)(ArtistOnboarding);
