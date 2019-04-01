import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

import TextArea from '../form/TextArea';
import InputButtons from './InputButtons';

import { DeleteButton } from '../form/FabButton';
import DragHandleMoveButton from '../DraggableCodeForms/DragHandleMoveButton';

import { getEmbedCode } from '../../helpers/embedHelpers';

class DraggableCodeInput extends Component {

  render() {
    const {
      order,
      remove,
      innerRef,
      dndProvidedProps,
      classes,
      width,
      change,
      itemName,
      placeholder,
    } = this.props;

    return (
      <div
          ref={innerRef}
          className={`${classes.codeInput}`}
          {...dndProvidedProps.draggableProps} >
        <Grid container direction="row">
          <InputButtons
              component={TextArea}
              key={`input-${itemName}[${order}]`}
              name={`${itemName}[${order}].code`}
              className={classes.textArea}
              onBlur={(event) => {
                setTimeout(() => {
                  const value = event.currentTarget.value;
                  change(`${itemName}[${order}].code`, getEmbedCode(value));
                });
              }}
              placeholder={placeholder}
              isMobile={'xs' === width} >
            <DeleteButton
                mobileText="clear"
                onClick={() => remove(order)}
                className={classes.button} />
            <DragHandleMoveButton
                dndProvidedProps={dndProvidedProps}
                classes={classes} />
          </InputButtons>
        </Grid>
      </div>
    );
  }
}

const DraggableCodeInputs = (props) => {
  const { itemName, items, classes, width, remove, placeholder, change } = props;

  return (
    <div className={classes.codeInputParent}>
    {
      _.map(items, (props, idx) => {
        return <Draggable key={`${itemName}-${idx}`} draggableId={`${itemName}[${props.order}]`} index={idx}>
          {(provided, snapshot) => (
            <DraggableCodeInput
              {...props}
              dndProvidedProps={provided}
              innerRef={provided.innerRef}
              classes={classes}
              change={change}
              itemName={itemName}
              placeholder={placeholder}
              width={width}
              remove={remove} />
          )}
        </Draggable>;
      })
    }
    </div>
  );
}

export default DraggableCodeInputs;
