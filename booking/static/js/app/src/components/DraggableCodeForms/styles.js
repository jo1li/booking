import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => {
  const parentStyles = editModalStyles(theme);
  return {
  ...parentStyles,
    tabBody: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      paddingTop: theme.spacing.unit * 2,
      overflowY: 'scroll',
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
    captionTop: {
      padding: `0 ${theme.spacing.unit * 3}px`,
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },

    [theme.breakpoints.down('xs')]: {
      ...parentStyles[theme.breakpoints.down('xs')],
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
  };
}

export default styles;
