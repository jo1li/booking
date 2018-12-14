import { Thermometer } from "react-feather";

const styles = theme => ({
  card: {
    display: 'flex',
    color: theme.palette.grey[600],
    '& > hr': {
      opacity: '0.5',
    },

    // NOTE: Compiler isn't happy about this "unnecessary calculation", but
    // it is the only way I know of to get these custom-width media queries in,
    // bc it prevents processing done on the key.
    // See https://stackoverflow.com/questions/45847090/media-queries-in-material-ui-components
    ['@media (min-width:768px)']: {
      width: '225px',
      flexDirection: 'column',
      // margin: '0 auto',
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
      height: '144px',
    },
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: '272px',
      minHeight: '174px',
      maxHeight: '220px',
      order: 0,
    },
    [theme.breakpoints.down('xs')]: {
      height: '144px',
    },
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    ['@media (max-width:768px) and (min-width:600px)']: {
      width: "calc(100% - 272px)",
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
    color: theme.palette.grey[600],
    boxSizing: 'content-box',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 1.5,
    // height: '42px',
    // overflow: 'hidden', // TODO: Behavior here? Can't do ellipsis with multi-line.
  },

  avatarStandIn: {
    display: 'block',
    lineHeight: '110px',
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    color: 'rgba(0,0,0,0.25)',
    fontWeight: 500,
  },
  stageName: {
    marginTop: `${theme.spacing.unit/2}px`,
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
  socialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    // borderTop: `1px solid ${theme.palette.grey[100]}`,
    gridGap: "1px 1px",
    backgroundColor: theme.palette.grey[100],
  },
  socialGridItem: {
    backgroundColor: "white",
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
    borderRadius: '0',
    color: theme.palette.primary.light,
    width: "100%",
    height: "100%",
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit}px`,
    paddingBottom: theme.spacing.unit*2,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    }
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
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 1.5,
      paddingBottom: theme.spacing.unit * 1.5,
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
