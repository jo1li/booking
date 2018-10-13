import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import autoBind from 'react-autobind';
import { arrayMove } from 'redux-form';

import _ from 'lodash';

class DroppableContainer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  // Get items but with the item at the start index moved to the end index.
  getReorderedItems({itemsFromForm, startIndex, endIndex}) {
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

    change(itemName, this.getReorderedItems({
      itemsFromForm: currentValues[itemName],
      startIndex: result.source.index,
      endIndex: result.destination.index,
    }));
  }

  render() {
    const { itemName, className, children } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={`${itemName}-edit-form`}>
          {(provided, snapshot) => (
            <div className={className}>
              { React.cloneElement(children, {provided, ref: child => {this.child = child}}) }
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DroppableContainer;
