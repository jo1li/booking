import React from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

export default (props) => {
  // TODO: only convert datetime to date one time
  // TODO: worry about timezones
  // TODO: show-name should be venue-name, probably psd2html got confused
  return (
    <tr>
      <td>{format(new Date(props.start_datetime), 'M/d/YYYY')}</td>
      <td className="show-name">{props.venue_name}</td>
      <td>{props.venue_city}, {props.venue_state}</td>
      <td className="booked"></td>
    </tr>
  );
}
