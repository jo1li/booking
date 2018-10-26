import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => ({
  ...editModalStyles(theme),
  captionTop: {
    margin: '0 12px 12px 12px',
    padding: '12px 0px 5px!important',
    color: theme.palette.grey['A400'],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  textArea: {
    height: '300px',
  },
});

export default styles;
