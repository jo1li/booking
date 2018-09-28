import _ from 'lodash';

export const getCreatedItems = ({currentItems}) => {
  return _.filter(currentItems, item => !item.id);
}

export const getUpdatedItems = ({currentItems, initialItems, updatableFields}) => {
  const initialItemsByID = _.keyBy(initialItems, 'id');

  return _.filter(currentItems, (item) => {
    // Items not yet on the server can't be updated.
    if (!item.id) return false;

    const initialState = initialItemsByID[item.id];
    const wasUpdated = _.some(updatableFields, (field) => item[field] !== initialState[field]);
    return wasUpdated;
  });
}

export const getDestroyedItems = ({currentItems, initialItems}) => {
  const currentItemsByID = _.keyBy(currentItems, 'id');
  return _.filter(initialItems, (item) => {
    // Items not yet on the server can't be destroyed.
    return !!item.id && !_.has(currentItemsByID, item.id);
  });
}

export const removeItemFromForm = ({currentItems, change, itemIndex, itemName}) => {
  let remainingItems = _.clone(currentItems);
  // Leave blank in form to prevent popping
  remainingItems[itemIndex] = { order: itemIndex };
  change(itemName, remainingItems);
}
