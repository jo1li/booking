import editModalStyles from '../../sharedStyles/editModalStyles';
import ScaledElement from '../ScaledElement';

const styles = theme => {
  const modalStyles = editModalStyles(theme);

  const FOOTER_HEIGHT = 90;
  const HEADER_HEIGHT = 62;
  const PREVIEW_SECTION_HEIGHT = 94;
  const MARGIN_HEIGHT = theme.spacing.unit * 12;
  const PADDING_HEIGHT = theme.spacing.unit * 4;
  const WIGGLE_ROOM = 30; // TODO: why
  const MAX_MODAL_WIDTH = modalStyles.container.maxWidth;

  const ASPECT_RATIO = ScaledElement.defaultProps.ratio;

  const EXTRA_HEIGHT = (
    FOOTER_HEIGHT +
    HEADER_HEIGHT +
    PREVIEW_SECTION_HEIGHT +
    MARGIN_HEIGHT +
    PADDING_HEIGHT
  );

  const MAX_HEIGHT_AT_WIDEST_MODAL = (
    MAX_MODAL_WIDTH / ASPECT_RATIO +
    EXTRA_HEIGHT +
    WIGGLE_ROOM
  );

  return {
    ...modalStyles,
    noScrollBody: {
      height: '100%',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
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
      width: '100%'
    },

    // Show a disabled message instead of the cropper on too-short screens:
    disabledMessage: {
      display: 'none',
    },
    // Usually the user's screen is wide enough to see a non-full-screen modal,
    // which has an awkward max usable height
    [`@media (min-width:${theme.breakpoints.values.sm}px) and (max-height:${MAX_HEIGHT_AT_WIDEST_MODAL}px)`]: {
      noScrollBody: {
        display: 'none',
      },
      disabledMessage: {
        display: 'block',
        ...modalStyles.scrollableBody,
      }
    },
    // Other times the user is on a device with a smaller screen, like iPhone 5,
    // so that even in landscape they see the full-screen modal -
    // just make sure the screen is in portrait orientation in this case.
    [`@media (max-width: ${theme.breakpoints.values.sm}px) and (min-aspect-ratio: 1/1)`]: {
      noScrollBody: {
        display: 'none',
      },
      disabledMessage: {
        display: 'block',
        ...modalStyles.scrollableBody,
      }
    }
}};

export default styles;
