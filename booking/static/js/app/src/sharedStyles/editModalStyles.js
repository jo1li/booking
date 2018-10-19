const styles = theme => ({
  container: {
    maxWidth: '700px',
    width: '100%',
    height: `calc(100vh - ${theme.spacing.unit * 12})`,
    padding: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  caption: {
    color: theme.palette.grey['A400'],
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
