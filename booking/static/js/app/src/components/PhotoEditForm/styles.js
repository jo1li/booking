import editModalStyles from '../../sharedStyles/editModalStyles';

const SMALL_SCREEN_ROW_HEIGHT = '106px';
const SMALL_SCREEN_TOP_ROW_HEIGHT = '65px';
const LARGE_SCREEN_ROW_HEIGHT = '80px';

const styles = theme => {
  const parentStyles = editModalStyles(theme);
  const xs = parentStyles[theme.breakpoints.down('xs')];
  return {
    ...parentStyles,
    button: {
      minWidth: '0px',
      position: 'relative',
      marginLeft: '10px',
      '&:first-child': {
        marginLeft: '0px',
      },
      backgroundColor: 'white', // Looks better when moving over other items
    },
    captionTop: {
      margin: '0 12px 12px',
      padding: '0!important',
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    coverPhotoIndicator: {
      alignSelf: 'center',
      marginLeft: 'auto',
    },
    coverPhotoIndicatorCheckMark: {
      marginBottom: '-1px', // Wants to float up and increase height of container
      height: '15px',
    },
    deleteButton: {
      color: theme.palette.grey[500],
      border: 'none',
      alignSelf: 'center',
      boxSizing: 'content-box',
      width: '22px',
      height: '22px',
      padding: '10px',
      borderRadius: 0, // Overwrite MUI icon radius. Looks horrible rn.
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
      color: theme.palette.grey[500],
    },
    editPhotoImageWrapper: {
      width: '114px',
      overflow: 'hidden',
    },
    pendingPhotoFormRow: {
      backgroundColor: theme.palette.grey[100],
    },
    photoEditFormSubmitButton: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      fontSize: '16px',
      backgroundColor: theme.palette.grey[100],
      width: '100%',
      height: '60px',
      borderRadius: '2px',
      lineHeight: '60px',
      textAlign: 'center',
    },
    photoForm: {
      '& > div:not($photoFormRowContainer)': {
        // react-beautiful-dnd and material-ui are stepping on each other's toes
        // this keeps the react-beautiful-dnd 'placeholder' from widening the dialog
        width: '0!important'
      }
    },
    photoFormRow: {
      borderRadius: '3px',
      // TODO: get this color into themes somewhere?
      boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: 'white',
    },
    photoFormRowContainer: {
      paddingBottom: '16px',
      position: 'relative', // needed for z-index when animating removing rows
    },
    photoImg: {
      height: '100%',
      width: 'auto',
    },
    setAsCoverPhotoButton: {
      marginLeft: 'auto',
      alignSelf: 'center',
      color: theme.palette.secondary.main,
      cursor: 'pointer',
    },
    removed: {
      animationDuration: '0.4s',
      animationName: 'hide-photo-row',
      opacity: 0,
      paddingBottom: 0,
      zIndex: -1,
      height: 0,
    },
    previewPhoto: {
      // Height and width attrs needed for object-fit to work
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    // TODO: Move into edit form styles once styling is consistent
    aboveFooter: {
      padding: '12px 1px 0',
      marginBottom: '12px',
      overflowY: 'scroll',
    },
    loadingIcon: {
      alignSelf: 'center',
    },
    loadingText: {
      marginLeft: '8px',
      alignSelf: 'center',
      color: 'black',
      letterSpacing: '0.3px',
    },

    // Media queries don't add precedence, and Material-UI moved them around.
    [theme.breakpoints.up('sm')]: {
      ...parentStyles[theme.breakpoints.up('sm')],
      photoFormRow: {
        height: LARGE_SCREEN_ROW_HEIGHT,
      },
      editPhotoImageWrapper: {
        height: LARGE_SCREEN_ROW_HEIGHT, // If this is a % instead of absolute, preview image resizes it
      },
      photoFormRowTop: {
        height: LARGE_SCREEN_ROW_HEIGHT,
      },
      deleteButton: {
        marginLeft: 0,
      },
      loadingIcon: {
        marginLeft: '24px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      ...parentStyles[theme.breakpoints.down('xs')],
      photoFormRow: {
        height: SMALL_SCREEN_ROW_HEIGHT,
      },
      editPhotoImageWrapper: {
        height: SMALL_SCREEN_TOP_ROW_HEIGHT, // If this is a % instead of absolute, preview image resizes it
      },
      photoFormRowTop: {
        height: SMALL_SCREEN_TOP_ROW_HEIGHT,
      },
      photoFormRowBottom: {
        padding: '9px 8px',
        height: '40px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      },
      deleteButton: {
        marginLeft: 'auto',
      },
      loadingIcon: {
        marginLeft: '8px',
      },
    },

  };
}

export default styles;
