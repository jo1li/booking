const styles = theme => ({
  container: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  videoCodeInputParent: {
    '& > div:not($videoCodeInput)': {
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
  helpScreenshotContainer: {
    textAlign: 'center',
    border: '2px solid #eeeeee',
    height: '150px',
    // TODO: get real images, then remove this
    '& img': {
      height: '100%',
      width: 'auto',
    }
  },
  helpTextContainer: {
    paddingLeft: '24px',
  },
  tab: {
    '&:focus': { // TODO: clean this up, just getting specificity bc reboot.scss really wants us to have outlines
      outline: 'none', // TODO: figure out a better solution that doesn't mess with accessibility
    }
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
