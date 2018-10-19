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

  // TODO: might want to move into a component
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
  aboveFooter: {
    padding: '12px 1px',
    marginBottom: '12px',
    overflowY: 'scroll',
  },

});

export default styles;
