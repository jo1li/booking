import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => ({
  ...editModalStyles(theme),
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
    padding: '0 35px',
    width: '89px',
    backgroundColor: 'transparent',
    outline: 'none', // TODO: more accessibility
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
    height: '100%',
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
    height: '80px',
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

  [theme.breakpoints.down('sm')]: {
    // Modal is full-screen at this width, so no need to prevent
    // width popping between tabs.
    container: {
      width: 'auto',
    }
  },

  [theme.breakpoints.up('sm')]: {
    photoFormRowTop: {
      height: '80px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    photoFormRow: {
      height: '106px',
    },
    photoFormRowTop: {
      height: '65px',
    },
    photoFormRowBottom: {
      padding: '9px 8px',
      height: '40px',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)'
    },
    deleteButton: {
      marginLeft: 'auto',
    }
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

});

export default styles;
