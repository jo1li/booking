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
      width: '140px',
      height: '70px'
    },
    ratioContainer: {
      width: '100%'
    },

    disabledMessage: {
      display: 'none',
    },
    [`@media (min-width:${theme.breakpoints.values.sm}px) and (max-height:${MAX_HEIGHT_AT_WIDEST_MODAL}px)`]: {
      noScrollBody: {
        display: 'none',
      },
      disabledMessage: {
        display: 'block',
        ...modalStyles.scrollableBody,
      }
    },
}};

export default styles;
