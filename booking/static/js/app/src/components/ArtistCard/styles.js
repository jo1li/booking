const styles = theme => ({
  card: {
    width: '235px',
    margin: '20px',
    '& > hr': {
      opacity: '0.5',
    },
  },
  editIcon: {
    padding: theme.spacing.unit / 2,
    // borderRadius: theme.shape.borderRadius,
    borderRadius: '4px',
    marginRight: `-${theme.spacing.unit}px`,
    marginTop: `-${theme.spacing.unit/2}px`,
    color: theme.palette.grey[400],
    '&:hover': {
      color: theme.palette.grey[600],
    },
    '&:active': {
      color: theme.palette.primary.main,
    },
  },
  padTopSm: {
    paddingTop: theme.spacing.unit / 2
  },
  media: {
    marginTop: '0px',
    height: 110,
    backgroundColor: theme.palette.grey[200],
  },
  gridRoot: {
    flexGrow: 1,
  },
  audience: {
    marginBottom: theme.spacing.unit / 2,
  },
  disabledColor: {
    color: theme.palette.grey[300],
  },
  service: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit / 2,
    width: 48,
  },
  serviceConnected: {
    // borderRadius: theme.shape.borderRadius,
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  serviceButton: {
    // borderRadius: theme.shape.borderRadius,
    borderRadius: '4px',
    color: theme.palette.grey[400],
  },
  serviceLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  stat: {
    paddingTop: theme.spacing.unit / 2,
    fontWeight: '500'
  },
  actions: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.grey[100]
    },
  },
  actionLabels: {
    color: theme.palette.primary.main,
  },
  reviewAction: {
    '& > a': {
      textDecoration: 'none'
    }
  },
  actionContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  tourlabel: {
    position: 'absolute',
    bottom: '6px',
    left: theme.spacing.unit * 1.5,
    textTransform: 'uppercase',
    padding: '2px 4px',
    background: theme.palette.secondary.main,
    color: 'black',
    borderRadius: '2px'
  },
  meta: {
    paddingTop: '8px',
    paddingBottom: '8px',
    marginBottom: '0px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
    }
  },
  websiteMeta: {
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
    '& a:hover': {
      color: theme.palette.primary.main,
    }
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 1.5,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingBottom: '0px'
    },
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit
    }
  }
});
export default styles;
