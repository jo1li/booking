const styles = theme => ({
  button: {
    position: 'relative',
    top: '-15px',
    marginLeft: '15px',
    '&:first-child': {
      marginLeft: '0px',
    }
  },
  captionTop: {
      margin: '0 12px',
      padding: '12px 0px 5px!important',
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
});

export default styles;
