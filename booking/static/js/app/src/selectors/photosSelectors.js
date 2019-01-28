import _ from 'lodash';
import { selectProfileHeroImageId } from './profileSelectors';

export const selectPhotos = state =>  _.get(state, 'photos', {});

export const selectHeroImage = state => {
    const photos = selectPhotos(state);
    const heroImageId = selectProfileHeroImageId(state);
    return photos[heroImageId];
}

export const selectHasHeroImage = state => Boolean(selectHeroImage(state));