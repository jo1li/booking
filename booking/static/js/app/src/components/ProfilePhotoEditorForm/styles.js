import editModalStyles from '../../sharedStyles/editModalStyles';
import { PROFILE_PHOTO_ASPECT_RATIO } from '../../constants/imageConstants';

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
      position: 'relative', // So the small screen message can center itself
      '& > *': {
        // Background color on hard-to-select profile photo editor
        backgroundColor: 'rgba(127,127,127,1)',
      }
    },
    smallScreenMessage: {
      borderRadius: 4,
      backgroundColor: 'transparent',
      textAlign: 'center',
      padding: theme.spacing.unit * 2,
    },
    hidden: {
      opacity: 0,
    }
}};

export default styles;
