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
});

export default styles;
