import {
    Add,
    CloudUpload,
    Delete,
    Help,
    Move,
} from '../../icons';
import FabIconButton from './FabIconButton';

export { default } from './FabButton';
export const AddButton = FabIconButton(Add);
export const UploadButton = FabIconButton(CloudUpload);
export const DeleteButton = FabIconButton(Delete);
export const HelpButton = FabIconButton(Help);
export const MoveButton = FabIconButton(Move);
