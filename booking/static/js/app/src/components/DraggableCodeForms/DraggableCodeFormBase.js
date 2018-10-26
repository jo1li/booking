import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import SubmissionError from 'redux-form/lib/SubmissionError'

import CancelConfirm from '../CancelConfirm';
import DraggableCodeInputs from './DraggableCodeInputs';
import HelpSection from './HelpSection';
import TabbedList from '../HOComponents/TabbedList';
import { Display1 } from '../typography';
import DroppableContainer from '../dragAndDrop/DroppableContainer';
import {
  getCreatedItems,
  getUpdatedItems,
  getDestroyedItems,
  removeItemContentFromForm,
} from '../../helpers/dragAndDropHelpers';
import { validate_video_embeds } from '../../utils/validators';

// A base for editing models with a `code` attribute that needs a textarea
class CodeFormBase extends Component {
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
    this.ensureBlankInputAvailable(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.ensureBlankInputAvailable(newProps);
  }

  removeItemFromForm(order) {
    const {currentValues, change, itemName} = this.props;
    const currentItems = currentValues[itemName];
    removeItemContentFromForm({currentItems, change, order, itemName});
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
      initialValues,
      itemName,
    } = this.props;

    // Treat items with no value in the `code` field as absent,
    // and ensure no gaps in `order` attributes.
    const currentItems = this.getItemsWithCodes();
    const initialItems = initialValues[itemName];

    // NB itemsToUpdate only includes items that have been changed
    const itemsToUpdate = getUpdatedItems({
      currentItems,
      initialItems,
      updatableFields: ['order', 'code'],
    });
    const itemsToCreate = getCreatedItems({currentItems});
    const itemsToDestroy = getDestroyedItems({currentItems, initialItems});

    const checkableItems = itemsToUpdate.concat(itemsToCreate)

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

  ensureBlankInputAvailable(newProps) {
    const { currentValues, change, itemName } = newProps;
    const lastItemHasCode = !!(_.last(currentValues[itemName]) || {}).code;

    if(lastItemHasCode || currentValues[itemName].length === 0) {
      const order = _.size(currentValues[itemName]);
      change(`${itemName}[${order}]`, {order});
    }
  }

  render() {
    const {
      handleSubmit,
      provided,
      classes,
      currentValues,
      itemName,
      copy,
      width,
      closeDialog,
      submitting,
      submitSucceeded,
      error,
      valid,
    } = this.props;

    return (
      <Grid container spacing={24}>
        <TabbedList
            classes={classes}
            tabNames={['embed', 'help']} >
          <Display1>{copy.title}</Display1>

          <Fragment>
            <form
                onSubmit={handleSubmit(this.submit)}
                ref={provided.innerRef}
                className={classes.tabBody} >
              <DraggableCodeInputs
                  items={currentValues[itemName]}
                  itemName={itemName}
                  placeholder={copy.inputPlaceholder}
                  classes={classes}
                  width={width}
                  remove={this.removeItemFromForm} />
            </form>
            {error && <strong>{error}</strong>}
            <CancelConfirm
                onClickCancel={closeDialog}
                onClickConfirm={this.submit}
                isLoading={submitting}
                success={submitSucceeded}
                isContainer={false}
                disabled={!valid}
              />
          </Fragment>

          <HelpSection
              className={classes.tabBody}
              classes={classes}
              helpCopyRows={copy.helpRows}
              itle={copy.helpSectionTitle} />

        </TabbedList>
      </Grid>
    );
  }
}

const DraggableCodeFormBase = (props) => {
  const { classes, itemName, formName, currentValues, change } = props;
  console.log("DraggableCodeFormBase", props)
  return (
    <DroppableContainer
        change={change}
        currentValues={currentValues}
        className={classes.container}
        itemName={itemName} >
      <CodeFormBase {...props} />
    </DroppableContainer>
  );
};

export default DraggableCodeFormBase;
