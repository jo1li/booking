import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import _ from 'lodash';

import CancelConfirm from '../CancelConfirm';
import DraggableCodeInputs from './DraggableCodeInputs';
import HelpSection from './HelpSection';
import TabbedList from '../HOComponents/TabbedList';
import ModalHeader from '../ModalHeader';
import GettingStarted from './GettingStarted';
import DroppableContainer from '../dragAndDrop/DroppableContainer';
import {
  getCreatedItems,
  getUpdatedItems,
  getDestroyedItems,
  removeItemContentFromForm,
} from '../../helpers/dragAndDropHelpers';
import { validate_video_embeds } from '../../utils/validators';

const FormSection = (props) => {
  const {
    handleSubmit,
    submit,
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
    change,
    remove,
    goToTab, // Comes from tabbed list
  } = props;

  return (
    <Fragment>
      <form
          onSubmit={handleSubmit(submit)}
          ref={provided.innerRef}
          className={`${classes.tabBody} ${classes.scrollableBody}`} >
        {
          props[itemName].length ?
          null :
          <GettingStarted
              copy={copy.gettingStarted}
              className={classes.gettingStarted}
              classes={classes}
              goToTab={goToTab} />
        }
        <DraggableCodeInputs
            items={currentValues[itemName]}
            itemName={itemName}
            change={change}
            placeholder={copy.inputPlaceholder}
            classes={classes}
            width={width}
            remove={remove} />
      </form>
      {error && <strong>{error}</strong>}
      <CancelConfirm
          onClickCancel={closeDialog}
          onClickConfirm={submit}
          isLoading={submitting}
          success={submitSucceeded}
          className={classes.footer}
          isContainer={false}
          disabled={!valid} />
    </Fragment>
  );
}

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

    const itemsToUpdate = getUpdatedItems({
      currentItems,
      initialItems,
      updatableFields: ['order', 'code'],
    });
    const itemsToCreate = getCreatedItems({currentItems});
    const itemsToDestroy = getDestroyedItems({currentItems, initialItems});

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
      classes,
      copy,
    } = this.props;

    const helpSectionTitles = copy.helpSections.map(section => section.title);

    return (
      <Fragment>
        <TabbedList
            classes={classes}
            tabNames={['Embed'].concat(helpSectionTitles)} >
          <ModalHeader classes={classes} hasTabs={true}>{copy.title}</ModalHeader>

          <FormSection {...this.props} submit={this.submit} remove={this.removeItemFromForm}/>

          {
            copy.helpSections.map((section, idx) => {
              return <HelpSection
                  key={idx}
                  className={`${classes.tabBody} ${classes.scrollableBody}`}
                  classes={classes}
                  helpCopyRows={section.helpRows} />;
            })
          }

        </TabbedList>
      </Fragment>
    );
  }
}

const DraggableCodeFormBase = (props) => {
  const { classes, itemName, currentValues, change, className } = props;
  return (
    <DroppableContainer
        change={change}
        currentValues={currentValues}
        className={`${className || ''} ${classes.container} ${classes.withFooter}`}
        itemName={itemName} >
      <CodeFormBase {...props} />
    </DroppableContainer>
  );
};

export default DraggableCodeFormBase;
