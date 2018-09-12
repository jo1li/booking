import React, { Component, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import CancelConfirm from '../CancelConfirm';
import DraggableCodeInputs from './DraggableCodeInputs';
import HelpSection from './HelpSection';
import TabbedList from '../HOComponents/TabbedList';
import { Display1 } from '../typography';

class DraggableCodeFormBase extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount(props) {
    const {
      profile,
      getArtistItems,
    } = this.props;

    getArtistItems({artistId: profile.id});
  }

  removeItemFromForm(order) {
    const { currentValues, change, itemName } = this.props;
    let remainingItems = _.clone(currentValues[itemName]);
    // Leave blank in form to prevent popping
    remainingItems[order] = { order };
    change(itemName, remainingItems);
  }

  getUpdatedItems(currentItems) {
    const { initialValues, itemName } = this.props;
    const initialItems = initialValues[itemName];

    const initialItemsByID = _.keyBy(initialItems, 'id');

    return _.filter(currentItems, (item) => {
      // Items not yet on the server can't be updated.
      if (!item.id) return false;

      const initialState = initialItemsByID[item.id];
      const codeWasChanged = item.code !== initialState.code;
      const orderWasChanged = item.order !== initialState.order;
      return codeWasChanged || orderWasChanged;
    });
  }

  getCreatedItems(currentItems) {
    return _.filter(currentItems, item => !item.id);
  }

  getDestroyedItems(currentItems) {
    const { initialValues, itemName } = this.props;
    const initialItems = initialValues[itemName];

    const currentItemsByID = _.keyBy(currentItems, 'id');

    return _.filter(initialItems, (item) => {
      // Items not yet on the server can't be destroyed.
      return !!item.id && !_.has(currentItemsByID, item.id);
    });
  }

  getItemsWithCodes() {
    const { currentValues, itemName } = this.props;
    const itemsWithCodes = _.filter(currentValues[itemName], v => !!v.code);
    // Update the order of each item so there will be no gaps
    const orderedItemsWithCodes = _.sortBy(itemsWithCodes, v => v.order);
    return _.map(orderedItemsWithCodes, (v, idx) => ({...v, order: idx}));
  }

  submit(values) {
    const {
      profile,
      updateArtistItem,
      createArtistItem,
      destroyArtistItem,
      closeDialog,
    } = this.props;

    // Treat items with no value in the `code` field as absent,
    // and ensure no gaps in `order` attributes.
    const itemsWithCodes = this.getItemsWithCodes();

    const itemsToUpdate = this.getUpdatedItems(itemsWithCodes);
    const itemsToCreate = this.getCreatedItems(itemsWithCodes);
    const itemsToDestroy = this.getDestroyedItems(itemsWithCodes);

    const updateRequests = _.map(itemsToUpdate, (item) => {
      updateArtistItem({
        id: item.id,
        code: item.code,
        order: item.order,
        artistId: profile.id,
      });
    });

    const createRequests = _.map(itemsToCreate, (item) => {
      createArtistItem({
        code: item.code,
        order: item.order,
        artistId: profile.id,
      });
    });

    const destroyRequests = _.map(itemsToDestroy, (item) => {
      destroyArtistItem({
        id: item.id,
        artistId: profile.id,
      });
    });

    const requests = _.concat(updateRequests, createRequests, destroyRequests);

    // TODO: handle error
    Promise.all(requests).then(closeDialog);
  }

  getReorderedItems(itemsFromForm, startIndex, endIndex) {
    let reorderedItems = Array.from(itemsFromForm);
    const [displacedItem] = reorderedItems.splice(startIndex, 1);
    reorderedItems.splice(endIndex, 0, displacedItem);
    reorderedItems = _.map(reorderedItems, (v, idx) => {return {...v, order: idx}});
    return reorderedItems;
  };

  onDragEnd(result) {
    const { currentValues, change, itemName } = this.props;

    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    change(itemName, this.getReorderedItems(
      currentValues[itemName],
      result.source.index,
      result.destination.index,
    ));
  }

  ensureBlankInputAvailable() {
    const { currentValues, change, itemName } = this.props;
    const lastItemHasCode = !!(_.last(currentValues[itemName]) || {}).code;

    if(lastItemHasCode || currentValues[itemName].length === 0) {
      const order = _.size(currentValues[itemName]);
      change(`${itemName}[${order}]`, {order});
    }

  }

  render() {
    const {
      currentValues,
      closeDialog,
      submitting,
      handleSubmit,
      classes,
      submitSucceeded,
      width,
      itemName,
      copy,
    } = this.props;

    this.ensureBlankInputAvailable();

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={`${itemName}-edit-form`}>
          {(provided, snapshot) => (
            <div className={classes.container}>
              <Grid container spacing={24}>
                <TabbedList
                    classes={classes}
                    tabNames={['embed', 'help']} >
                  <Display1>{copy.title}</Display1>

                  <Fragment>
                    <form onSubmit={handleSubmit(this.submit)} ref={provided.innerRef} className={classes.tabBody}>
                      <DraggableCodeInputs
                          items={currentValues[itemName]}
                          itemName={itemName}
                          placeholder={copy.inputPlaceholder}
                          classes={classes}
                          width={width}
                          remove={this.removeItemFromForm} />
                    </form>
                    <CancelConfirm
                        onClickCancel={closeDialog}
                        onClickConfirm={this.submit}
                        isLoading={submitting}
                        success={submitSucceeded}
                        isContainer={false} />
                  </Fragment>

                  <HelpSection className={classes.tabBody} classes={classes} helpCopyRows={copy.helpRows} title={copy.helpSectionTitle} />

                </TabbedList>
              </Grid>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DraggableCodeFormBase;
