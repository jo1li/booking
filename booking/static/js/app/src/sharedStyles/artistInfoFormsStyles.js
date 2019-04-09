const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing.unit * 5,
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  genreLabel: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    paddingBottom: theme.spacing.unit/2,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  state: {
    minWidth: 110,
    width: 'auto',
    maxWidth: '100%',
  },
  city: {
    maxWidth: '100%',
  },
  splitLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textCount: {
    ...theme.palette.overline,
    color: theme.palette.grey[600],
  },
  uploadArea: {
    width: '100%',
    borderRadius: 3,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    overflow: 'hidden',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    ...theme.typography.button,
    color: 'white',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 0,
    marginRight: 0,
    // TODO: Should not have to overwrite radius in RaisedButton
    borderRadius: 2,
    boxShadow: 'none',
  },
  textInput: {
    ...theme.typography.body1,
    opacity: 1,
    '&::placeholder': {
      opacity: 1,
      color: theme.palette.grey[500],
    },
  },
  placeholder: {
    ...theme.typography.body1,
    color: theme.palette.grey[500],
  },
  label: {
    ...theme.typography.overline,
    transform: 'none', // Overwrite material-ui shrinking behavior
    color: theme.palette.grey[800],
  },
  error: {
    ...theme.typography.caption,
    color: 'red',
  },
});

export default styles;
