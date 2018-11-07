const styles = theme => ({
  container: {
    maxWidth: '700px',
    width: `calc(100vw - ${theme.spacing.unit * 8}px)`,
    height: `calc(100vh - ${theme.spacing.unit * 12}px)`,
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      width: '100%',
      height: '100%',
    }
  },

  caption: {
    color: theme.palette.black,
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  captionAboveTabs: {
    color: theme.palette.black,
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
  },

  scrollableBody: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    overflowY: 'scroll',
  },

  // For footers
  footer: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing.unit * 3,
    backgroundColor: theme.palette.grey[100],
  },
  withFooter: {
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    flex: 0,
  },
});

export default styles;
