const styles = theme => ({
  container: {
    maxWidth: '700px',
    width: `calc(100vw - ${theme.spacing.unit * 8}px)`,
    height: `calc(100vh - ${theme.spacing.unit * 12}px)`,
    padding: '20px',
    paddingTop: '40px',
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      width: '100%',
      height: '100%',
    }
  },

  caption: {
    color: theme.palette.grey['A400'],
  },

  scrollableBody: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    overflowY: 'scroll',
  },

  // For footers
  footer: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    padding: '20px 0 12px',
    margin: '0 -20px', // Span full width, stepping on parent padding, so border-top looks nice
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
