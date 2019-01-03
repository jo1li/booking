import IconImg from './IconImg';
import CONFIGS from '../../configs';

export { default as Add } from '@material-ui/icons/Add';
// TODO: check that nothing that was using this gets broken by this change
// export { default as CheckCircle } from '@material-ui/icons/CheckCircle';

// TODO: Change the consumers to use the react-feather names instead of material-ui names
// to reduce hoop-jumping here
export { X as Close } from 'react-feather';
export { UploadCloud as CloudUpload } from 'react-feather';
export { Trash2 as Delete } from 'react-feather';
export { default as ExpandMore } from '@material-ui/icons/ExpandMore';
export { Move } from 'react-feather';
export { Edit } from 'react-feather';
export { Code } from 'react-feather';
export { CheckCircle } from 'react-feather';
export { Camera } from 'react-feather';
export { default as CircularProgress } from '@material-ui/core/CircularProgress';
export const Save = IconImg({src: `${CONFIGS.IMAGES_URL}/save.svg`, alt: 'Save Icon'});
export { default as Next } from './Next';
export { default as Prev } from './Prev';
