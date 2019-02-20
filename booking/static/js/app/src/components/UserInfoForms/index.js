import Dialog from '../Dialog/Dialog';
import UserInfoEditForm from './UserInfoEditForm';
export { default as OnboardingForm } from './OnboardingForm';
// import the edit form
// import the onboardin form and export it
// wrap the edit form in modal and export it

export const UserInfoEditFormModal = Dialog(UserInfoEditForm);
