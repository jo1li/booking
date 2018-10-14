import IconImg from './IconImg';
import CONFIGS from '../../configs';

export { default as Add } from '@material-ui/icons/Add';
// TODO: check that nothing that was using this gets broken by this change
// export { default as CheckCircle } from '@material-ui/icons/CheckCircle';
export { default as Close } from '@material-ui/icons/Close';
export { default as CloudUpload } from '@material-ui/icons/CloudUpload';
export { Trash2 as Delete } from 'react-feather';
export { default as ExpandMore } from '@material-ui/icons/ExpandMore';
export { Move } from 'react-feather';
export { Edit } from 'react-feather';
export { Code } from 'react-feather';
export { CheckCircle } from 'react-feather';
export { Camera } from 'react-feather';
export { default as CircularProgress } from '@material-ui/core/CircularProgress';
export const Save = IconImg({src: `${CONFIGS.IMAGES_URL}/save.svg`, alt: 'Save Icon'});
