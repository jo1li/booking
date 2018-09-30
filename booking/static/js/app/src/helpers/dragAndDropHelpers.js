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

// For leaving a placeholder when an item is removed
// Must filter on content props (e.g. `code`) before saving
export const removeItemContentFromForm = ({currentItems, change, order, itemName}) => {
  let remainingItems = _.clone(currentItems);
  // Leave blank in form to prevent popping
  remainingItems[order] = { order };
  change(itemName, remainingItems);
}

// For removing an item but allowing for animation
// Must filter on `removed` before saving
export const flagItemForRemoval = ({currentItems, change, itemIndex, itemName}) => {
  const removedItem = currentItems[itemName][itemIndex];
  // NB: these will be found and sent for deletion
  change(`${itemName}[${itemIndex}]`, {...removedItem, removed: true});
}
