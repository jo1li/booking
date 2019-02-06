import editModalStyles from '../../sharedStyles/editModalStyles';

const styles = theme => {
  const modalStyles = editModalStyles(theme);

  return {
    ...modalStyles,
    noScrollBody: {
      flexGrow: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    avatarEditor: {
      margin: '0 auto',
      display: 'block',
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
    previewWithScale: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      }
    },
    slider: {
      paddingTop: 15,
      paddingLeft: 6,
    },
    preview: {
      width: 75,
      height: 48,
    },
    ratioContainer: {
      flexGrow: 1,
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      '& > *': {
        // Background color on hard-to-select profile photo editor
        backgroundColor: 'rgba(127,127,127,1)',
      }
    }
}};

export default styles;
