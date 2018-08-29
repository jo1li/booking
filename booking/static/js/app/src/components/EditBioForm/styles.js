// TODO: Share more of these styles between the modals
const styles = theme => ({
  container: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  caption: {
    color: theme.palette.grey['A400'],
  },
  captionTop: {
    margin: '0 12px',
    padding: '12px 0px 5px!important',
    color: theme.palette.grey['A400'],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  textArea: {
    height: '300px',
  },
});

export default styles;
