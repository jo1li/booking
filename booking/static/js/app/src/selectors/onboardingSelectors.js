import { getFormValues } from 'redux-form';
import { ARTIST_ONBOARDING } from '../constants/forms';
import _ from 'lodash';

export const selectImageFile = state => {
    const values = getFormValues(ARTIST_ONBOARDING)(state);
    return _.get(values, 'image[0]', {});
}

export const selectImagePreview = state => {
    const imageFile = selectImageFile(state);
    return _.get(imageFile, 'preview', '')
}