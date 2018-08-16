const styles = theme => ({
  videoCodeInputParent: {
    '& > div:not(.video-code-input)': {
      // react-beautiful-dnd and material-ui are stepping on each other's toes
      // this keeps the react-beautiful-dnd 'placeholder' from widening the dialog
      width: '0!important'
    }
  },
  videoCodeInput: {
    padding: '12px 0',
  },
  button: {
    minWidth: '0px',
    position: 'relative',
    marginLeft: '10px',
    '&:first-child': {
      marginLeft: '0px',
    },
    backgroundColor: 'white', // Looks better when moving over other items
  },
  buttonContainer: {
    marginLeft: '10px',
    display: 'flex', // Allows inner button to fill container
  },
  buttonsContainer: {
    paddingBottom: '10px',
  },
  captionTop: {
    margin: '0 12px 32px',
    padding: '12px 0px 5px!important',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  textArea: {
    backgroundColor: 'white', // Looks better when moving over other items
  },

  [theme.breakpoints.down('xs')]: {
    button: {
      padding: '8px 12px',
      width: '127px',
    },
    buttonContainer: {
      width: '127px',
      marginLeft: '26px',
      '& button': {
        marginLeft: 0,
        flex: 1,
      },
    }
  },
});

export default styles;
