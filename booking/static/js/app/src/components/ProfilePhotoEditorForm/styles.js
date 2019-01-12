import editModalStyles from '../../sharedStyles/editModalStyles';

const FOOTER_HEIGHT = 90;
const HEADER_HEIGHT = 62;
const PREVIEW_SECTION_HEIGHT = 94;
const PADDING_HEIGHT = 32;
const WIGGLE_ROOM = 30; // TODO: why
const MARGIN_HEIGHT = 96;
const MARGIN_WIDTH = 96;
const ASPECT_RATIO = 2;
const MAX_MODAL_WIDTH = 700;

const VIEWPORT_WIDTH_UPPER_END = MAX_MODAL_WIDTH + MARGIN_WIDTH;
const VIEWPORT_WIDTH_LOWER_END = 600; // comes from material-ui
const MIN_MODAL_WIDTH = VIEWPORT_WIDTH_LOWER_END - MARGIN_WIDTH;

const VIEWPORT_HEIGHT_AT_UPPER_WIDTH = MAX_MODAL_WIDTH / ASPECT_RATIO + FOOTER_HEIGHT + HEADER_HEIGHT + PREVIEW_SECTION_HEIGHT + MARGIN_HEIGHT + PADDING_HEIGHT + WIGGLE_ROOM;


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
    [`@media (min-width:${VIEWPORT_WIDTH_LOWER_END}px) and (max-height:${VIEWPORT_HEIGHT_AT_UPPER_WIDTH}px)`]: {
      scrollableBody: {
        display: 'none',
      },
      disabledMessage: {
        display: 'block',
        ...modalStyles.scrollableBody,
      }
    },
}};

export default styles;
