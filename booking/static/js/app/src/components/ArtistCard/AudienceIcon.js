import React from 'react';
import IconFacebook from './IconFacebook';
import IconInstagram from './IconInstagram';
import IconSpotify from './IconSpotify';

const AudienceIcon = (props) => {
  const { service, active } = props
  let iconComponent = <div/>
  switch(service) {
    case "facebook":
        iconComponent = <IconFacebook active={active} />
        break;
    case "instagram":
        iconComponent = <IconInstagram active={active} />
        break;
    case "spotify":
        iconComponent = <IconSpotify active={active} />
        break;
    default:
        break;
  }
  return (
    iconComponent
  )
}

export default AudienceIcon