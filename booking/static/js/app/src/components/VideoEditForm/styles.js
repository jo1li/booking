const styles = theme => ({
  'video-code-input-parent': {
    '& > div:not(.video-code-input)': {
      // react-beautiful-dnd and material-ui are stepping on each other's toes
      // this keeps the react-beautiful-dnd 'placeholder' from widening the dialog
      width: '0!important'
    }
  },
  'video-code-input': {
    padding: '12px',
  },
  button: {
    position: 'relative',
    marginLeft: '20px',
    '&:first-child': {
      marginLeft: '0px',
    },
    'background-color': 'white', // Looks better when moving over other items
  },
  moveButton: {
    cursor: 'grab',
    display: 'flex',
  },
  captionTop: {
    margin: '0 12px 32px',
    padding: '12px 0px 5px!important',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  textArea: {
    'background-color': 'white', // Looks better when moving over other items
  }
});

export default styles;
