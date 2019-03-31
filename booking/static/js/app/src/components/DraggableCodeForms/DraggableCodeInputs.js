import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import TextField from '../form/TextField';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash'
import autoBind from 'react-autobind';

import { Code, Delete } from '../icons';

const DeleteButton = (props) => {
  return <IconButton {...props} color='primary'><Delete width={22}/></IconButton>;
}

class DragHandle extends Component {
  render() {
    const { dndProvidedProps, classes } = this.props;
    // Note: `button` would be more semantic than `div` but `button` gives
    // `draggable=false` for some reason.
    return (
      <div {...dndProvidedProps.dragHandleProps} className={classes.dragHandle}>
        <Code className={classes.dragHandleIcon}/>
      </div>
    );
  }
}

const TopRow = (props) => {
  const {
    remove,
    dndProvidedProps,
    classes,
    itemName,
    items,
    order,
    label,
    placeholder,
  } = props;

  const idx = order; // TODO: sloppy
  const item = items[order]; // TODO: sloppy

  return <div className={classes.codeInput}>
      <DragHandle
          dndProvidedProps={dndProvidedProps}
          classes={classes} />
      <div className={classes.preview}>
        {
          item && item.src ?
        <iframe title={item && item.src} src={item && item.src} className={classes.iframe} alt="thumbnail" width='96px' height='96px'/> :
        null
        }
        <input type="hidden" value={item && item.id} name={`${itemName}[${idx}]`}/>
      </div>
      <div className={classes.inputFieldContainer}>
        <FormControl fullWidth>
          <Field
            name={`${itemName}[${order}].code`}
            component={TextField}
            label={label}
            style={{flexGrow: 1}}
            placeholder={placeholder}
            type="text"
            InputLabelProps={{
              shrink: true,
              classes: { shrink: classes.label },
            }}
            InputProps={{
              classes: {
                input: classes.textInput
              }
            }}
            errorClassName={classes.error}
          />
        </FormControl>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <DeleteButton
            className={classes.deleteButton}
            onClick={() => remove(idx)} />
      </div>
  </div>
}

// NB: this needs to be a class for react dnd to work.
class DraggableCodeInputBase extends Component {
  render() {
    const {
      innerRef,
      dndProvidedProps,
      classes,
      item,
      TopRow,
    } = this.props;

    return (
      <div
          ref={innerRef}
          {...dndProvidedProps.draggableProps}
          className={`${classes.codeInputContainer} ${item && item.removed ? classes.removed : ''}`} >
        <TopRow {...this.props}/>
      </div>
    );
  }
}

class DraggableCodeInput extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <DraggableCodeInputBase
        TopRow={TopRow}
        {...this.props} />
    );
  }
}


const DraggableCodeInputs = (props) => {
  const { itemName, items, classes, width, remove, label, placeholder } = props;

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
              items={items}
              itemName={itemName}
              label={label}
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
