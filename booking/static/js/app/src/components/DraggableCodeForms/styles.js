import editModalStyles from '../../sharedStyles/editModalStyles';
import CONFIGS from '../../configs';

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
      '& > div:not($codeInputContainer)': {
        // react-beautiful-dnd and material-ui are stepping on each other's toes
        // this keeps the react-beautiful-dnd 'placeholder' from widening the dialog
        width: '0!important'
      }
    },
    codeInput: {
      backgroundColor: theme.palette.grey[50],
      display: 'flex',
      position: 'relative',
      boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.5)',
      borderRadius: '3px',
      height: 80,
    },
    codeInputContainer: {
      paddingBottom: 16,
      position: 'relative', // TODO: needed?
    },
    button: {
      minWidth: '0px',
      position: 'relative',
      marginLeft: '10px',
      '&:first-child': {
        marginLeft: '0px',
      },
      borderColor: theme.palette.primaryTonal[600],
    },
    moveButton: {
      height: '100%',
      width: 20,
      color: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    mobileHowTo: {
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing.unit * 2,
    },

    [theme.breakpoints.up('sm')]: {
      mobileHowTo: {
        display: 'none',
      }
    },

    [theme.breakpoints.down('xs')]: {
      ...parentStyles[theme.breakpoints.down('xs')],
      gettingStartedExampleContainer: {
        display: 'none',
      },
      howTo: {
        display: 'none',
      },
      mobileHowTo: {
        display: 'block',
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

    inputFieldContainer: {
      flexGrow: 1,
      paddingTop: 16,
      [theme.breakpoints.up('sm')]: {
        paddingRight: 32 - 14,
      },
      [theme.breakpoints.down('xs')]: {
        paddingRight: 16 - 14,
      }
    },

    // TODO: bring this into its own component at this point I guess
    textInput: {
      ...theme.typography.body1,
      opacity: 1,
      '&::placeholder': {
        ...theme.typography.body1,
        fontWeight: 200, // TODO: looks bold otherwise, even though input text is 400 and doesn't look bold - why?
        opacity: 1,
        color: theme.palette.grey[500],
      },
    },

    error: {
      display: 'none', // TODO: we need to show this somewhere!
    },

    preview: {
      backgroundImage: `url(${CONFIGS.IMAGES_URL}/tile.png)`,
      backgroundRepeat: 'repeat',
      backgroundSize: '16px 16px',
      height: 80,
      width: 112,
      marginRight: 16,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      }
    },

    label: {
      ...theme.typography.overline,
      transform: 'none', // Overwrite material-ui shrinking behavior
      color: theme.palette.grey[800],
    },
    deleteButton: {
      border: 'none',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      outline: 'none', // TODO: more accessibility
      marginRight: '19px',
      marginLeft: 'auto', // Push to the right end of the container
    },
    dragHandle: {
      width: '40px',
      display: 'flex',
      alignItems: 'center',
    },
    dragHandleIcon: {
      transform: 'rotate(90deg)',
      margin: '0 auto',
      color: theme.palette.grey['A100'],
    },
    iframe: {
      // Height and width attrs needed for object-fit to work
      height: 80,
      width: 114,
    },

  };
}

export default styles;
