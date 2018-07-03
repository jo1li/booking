import {
    CloudUpload,
    Delete,
    Add,
} from '../../icons';
import FabIconButton from './FabIconButton';

export { default } from './FabButton';
export const UploadButton = FabIconButton(CloudUpload);
export const DeleteButton = FabIconButton(Delete);
export const AddButton = FabIconButton(Add);