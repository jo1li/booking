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
      height: '129px',
      width: '198px',
      '& img': {
        height: '100%',
        width: 'auto',
      }
    },
    helpRowNumber: {
      height: '22px',
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '1.38',
      color: 'black',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 0,
        marginTop: theme.spacing.unit,
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing.unit * 3,
      },
    },
    helpTextContainer: {
      paddingLeft: theme.spacing.unit * 2,
      width: '170px',
      '& strong': {
        fontWeight: 500,
        fontStyle: 'italic',
      }
    },
    helpList: {
      paddingTop: theme.spacing.unit * 2,
    },
    helpSectionBackButton: {
      textTransform: 'uppercase',
      color: theme.palette.secondary.main,
      fontWeight: 500,
      fontSize: '14px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      height: '54px', // To match buttons in main tab footer
      boxSizing: 'border-box',
      padding: 0,
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

    gettingStarted: {
      fontSize: '16px',
      marginBottom: theme.spacing.unit * 5.5,
      paddingTop: theme.spacing.unit * 2,
    },
    gettingStartedExample: {
      fontSize: '11px',
      marginTop: '5px',
      overflowWrap: 'break-word',
      wordWrap: 'break-word', // Officially synonymous with the above, but some browsers support only one or the other
      wordBreak: 'break-word',
    },
    gettingStartedHelpButton: {
      marginTop: theme.spacing.unit * 2,
      padding: 0,
      border: 0,
      background: 'none',
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      lineHeight: '1.5',
      fontSize: '14px',
      cursor: 'pointer',
    },

    [theme.breakpoints.down('xs')]: {
      ...parentStyles[theme.breakpoints.down('xs')],
      gettingStartedExampleContainer: {
        display: 'none',
      },
      helpTextContainer: {
        marginTop: theme.spacing.unit,
      },
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
