import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => {
  const modalStyles = editModalStyles(theme);

  return {
    ...modalStyles,
    scrollableBody: {
      ...modalStyles.scrollableBody,
      // padding: '16px 0',
      padding: `16px ${theme.spacing.unit * 3}px`
    },
    body: {
        padding: `23px ${theme.spacing.unit * 3}px 68px`
    },
    modalPadding: {
      padding: '10px 24px',
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
    slider: {
      paddingTop: '23px',
    },
    preview: {
      width: '100px',
      height: '64px',
    },
    ratioContainer: {
      width: '100%',
      '&:hover': {
        cursor: 'move'
      }
    }
}};

export default styles;
