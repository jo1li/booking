const styles = theme => ({
  card: {
    display: 'flex',

    '& > hr': {
      opacity: '0.5',
    },

    // NOTE: Compiler isn't happy about this "unnecessary calculation", but
    // it is the only way I know of to get these custom-width media queries in,
    // bc it prevents processing done on the key.
    // See https://stackoverflow.com/questions/45847090/media-queries-in-material-ui-components
    ['@media (min-width:768px)']: {
      width: '235px',
      flexDirection: 'column',
      margin: '0 auto',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: 'auto',
      flexWrap: 'wrap',
      flexDirection: 'row',
      margin: '0 0 40px',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      flexDirection: 'column',
      margin: '0 0 40px',
    },
  },

  avatarSection: {
    marginTop: '0px',
    backgroundColor: theme.palette.grey[200],

    ['@media (min-width:768px)']: {
      height: '110px',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: '45%',
      height: '174px',
      order: 0,
    },
    [theme.breakpoints.down('xs')]: {
      height: '110px',
    },
  },

  infoSection: {
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: '55%',
      height: '174px',
      order: 1,
    },
  },

  content: {
    paddingTop: theme.spacing.unit,

    ['@media (min-width:768px)']: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingBottom: 0,
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 2,
      paddingBottom: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing.unit
    },
  },

  metaSection: {
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: '100%',
      order: 2,
    },
  },

  metaList: {
    ['@media (min-width:768px)']: {
      justifyContent: 'space-between',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },

  socialServices: {
    ['@media (min-width:768px)']: {
      justifyContent: 'center',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      justifyContent: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },

  tourlabel: {
    position: 'absolute',
    left: theme.spacing.unit * 1.5,
    textTransform: 'uppercase',
    padding: '2px 4px',
    background: theme.palette.secondary.main,
    color: 'black',
    borderRadius: '2px',

    ['@media (min-width:768px)']: {
      bottom: '6px',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      bottom: '-31px',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '6px',
    },
  },
  tagline: {
    boxSizing: 'content-box',
    paddingTop: theme.spacing.unit,
    height: '42px',
    overflow: 'hidden', // TODO: Behavior here? Can't do ellipsis with multi-line.
  },

  avatarStandIn: {
    display: 'block',
    lineHeight: '110px',
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    color: 'rgba(0,0,0,0.25)',
    userSelect: 'none',
    fontWeight: 500,
    '& > button > svg': {
      marginRight: theme.spacing.unit,
    },
    '& > button': {
      width: "100%",
      height: "100%",
      color: theme.palette.primary.main,
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      lineHeight: '174px',
    },
  },
  stageName: {
    fontSize: '27px',
  },
  editIcon: {
    padding: theme.spacing.unit / 2,
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
  gridRoot: {
    flexGrow: 1,
  },
  audience: {
    marginBottom: theme.spacing.unit / 2,

    ['@media (max-width:768px) and (min-width:600px)']: {
      paddingLeft: theme.spacing.unit * 1.5,
    },
  },
  disabledColor: {
    opacity: 0,
    color: theme.palette.grey[200],
    marginTop: 4,
  },
  service: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit / 2,
    width: 48,

    ['@media (max-width:768px) and (min-width:600px)']: {
      paddingBottom: 0,
    },
  },
  serviceMetric: {
    ['@media (max-width:768px) and (min-width:600px)']: {
      marginTop: 0,
    },
  },
  serviceConnected: {
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  serviceButton: {
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
    marginLeft: theme.spacing.unit * 3,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
    '& a:hover': {
      color: theme.palette.primary.main,
    }
  },
});

export default styles;
