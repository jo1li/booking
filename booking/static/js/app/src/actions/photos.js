import ActionCreators from './actionCreators';
import * as requests from '../request/requests';
import { getFormData } from '../utils/formHelpers';
import { updateProfile } from './profile';

// TODO: error handling

export function createArtistPhoto({ artistId, file, data }) {
    return (dispatch, getState) => {
        const createPhotoData = getFormData({ image: file, data: JSON.stringify(data) })
        return requests.createPhoto({artistId, file: createPhotoData})
            .then(res => {
                dispatch(ActionCreators.photosCreateOrUpdate(res.data));
                return res;
            })
    }
}

export function createCoverPhoto({ artistId, file, backgroundImageTop }) {
    return async (dispatch, getState) => {
        const data = {
            coverPhotoStyles: {
                backgroundImageTop
            }
        }
        const createPhotoRes = await dispatch(createArtistPhoto({ artistId, file, data }));
        const profileData = { image_hero_id: createPhotoRes.data.id }
        const updateProfileRes = await dispatch(updateProfile(profileData, artistId));
    }
}

export function updateArtistPhoto({id, artistId, order}) {
    return (dispatch, getState) => {
        return requests.updatePhoto({artistId, photoId: id, order}).then(res => {
            dispatch(ActionCreators.photosCreateOrUpdate(res.data));
        })
    }
}

export function getArtistPhotos({artistId}) {
    return (dispatch, getState) => {
        return requests.getPhotos({artistId}).then(res => {
            dispatch(ActionCreators.photosCreateOrUpdate(res.data.results));
        });
    }
}

export function destroyArtistPhoto({id, artistId}) {
    return (dispatch, getState) => {
        return requests.destroyPhoto({artistId, photoId: id}).then(res => {
            dispatch(ActionCreators.photosDelete(id));
        });
    }
}
