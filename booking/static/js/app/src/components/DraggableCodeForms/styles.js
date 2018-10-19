import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => ({
  ...editModalStyles(theme),
  tabBody: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '0 12px',
  },
  codeInputParent: {
    '& > div:not($codeInput)': {
      // react-beautiful-dnd and material-ui are stepping on each other's toes
      // this keeps the react-beautiful-dnd 'placeholder' from widening the dialog
      width: '0!important'
    }
  },
  codeInput: {
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
    margin: '0 12px 12px',
    padding: '0!important',
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
    '&:focus': {
      outline: 'none',
      // Just give a hard-to-notice background until we decide what we want to
      // want to do for accessibility. Not great but better than nothing.
      // TODO: check with team about what they want for :focus accessibility
      backgroundColor: '#fafafa',
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
    },
  },

  [theme.breakpoints.down('sm')]: {
    // Modal is full-screen at this width, so no need to prevent
    // width popping between tabs.
    container: {
      width: 'auto',
    }
  },
});

export default styles;
