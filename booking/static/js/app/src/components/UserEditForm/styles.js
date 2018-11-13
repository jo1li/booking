import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => ({
  ...editModalStyles(theme),
  captionTop: {
    padding: '12px 0px 5px!important',
    color: theme.palette.grey['A400'],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  button: {
    position: 'relative',
    top: '-15px',
    marginLeft: '15px',
    '&:first-child': {
      marginLeft: '0px',
    }
  },
});

export default styles;
