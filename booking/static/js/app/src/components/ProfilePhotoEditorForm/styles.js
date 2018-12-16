import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => {
  const modalStyles = editModalStyles(theme);

  return {
    ...modalStyles,
    noScrollBody: {
      height: '100%',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    scrollableBody: {
      ...modalStyles.scrollableBody,
      padding: '16px 0',
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
      width: '140px',
      height: '70px'
    },
    ratioContainer: {
      overflow: 'hidden',
      width: '100%'
    }
}};

export default styles;
