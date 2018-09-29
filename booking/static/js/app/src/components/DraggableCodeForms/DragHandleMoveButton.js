import React from 'react';
import { MoveButton } from '../form/FabButton';

const DragHandleMoveButton = (props) => {
  const { dndProvidedProps, classes } = props;
  return (
    <div
        {...dndProvidedProps.dragHandleProps}
        className={classes.buttonContainer} >
      <MoveButton
          {...dndProvidedProps.dragHandleProps}
          onMouseDown={(e) => {
            /**
             * We can't implement movebutton as a drag handle in the
             * usual way because of some features we are using on
             * fabbutton, but we can wrap it and ask the movebutton to
             * send its mousedown to the parent.
             * NB: target on lhs and currentTarget on rhs is intentional.
             * `target` needs to be the drag handle with the props;
             * `currentTarget` will be the move button, and its parent
             * will be the drag handle.
             */
            e.target = e.currentTarget.parentNode;
            return dndProvidedProps.dragHandleProps.onMouseDown(e);
          }}
          mobileText="move"
          className={`${classes.moveButton} ${classes.button}`} />
    </div>
  );
};

export default DragHandleMoveButton;
