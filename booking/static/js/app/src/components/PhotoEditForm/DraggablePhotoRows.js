import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import _ from 'lodash';

import PendingPhotoRow from './PendingPhotoRow';
import PhotoRow from './PhotoRow';
import {
  updateUserBio,
} from '../../request/requests';

const DraggablePhotoRows = (props) => {
  const {
    itemName,
    items,
    classes,
    width,
    remove,
    profile,
    pendingItems,
    coverPhotoID,
  } = props;

  return (
    <div className={classes.photoForm}>
      {
        _.map(items, (props, idx) => {
          const item = items[idx];
          return (
            <Draggable
                key={`${itemName}-${item.id}`}
                draggableId={`${itemName}[${item.id}]`}
                index={idx}>
              {(provided, snapshot) => (
                <PhotoRow
                    key={`${itemName}-${idx}`}
                    dndProvidedProps={provided}
                    innerRef={provided.innerRef}
                    classes={classes}
                    item={item}
                    isCoverPhoto={item.id === coverPhotoID}
                    idx={idx}
                    itemName={itemName}
                    width={width}
                    profile={profile}
                    remove={remove} />
              )}
            </Draggable>
          );
        })
      }
      <PendingRows pendingItems={pendingItems} classes={classes} itemName={itemName} width={width} />
    </div>
  );
}

const PendingRows = (props) => {
  const { pendingItems, classes, itemName, width } = props;
  return _.map(pendingItems, (props, idx) => (
    <PendingPhotoRow
        key={`pending-${itemName}-${idx}`}
        classes={classes}
        item={pendingItems[idx]}
        idx={idx}
        width={width}
        itemName={itemName} />
  ));
}

const mapStateToProps = (state, props) => ({
  profile: state.profile,
  coverPhotoID: _.get(state.profile, 'image_hero.id', null),
  updateUserBio,
})

export default connect(mapStateToProps)(DraggablePhotoRows);
