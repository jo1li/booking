import _ from 'lodash';

export const selectProfile = state =>  _.get(state, 'profile', {});

export const selectProfileHeroImage = state => {
    const profile = selectProfile(state);
    return _.get(profile, 'image_hero', {});
}

export const selectProfileHeroImageId = state => {
    const imageHero = selectProfileHeroImage(state);
    return _.get(imageHero, 'id', null);
}
