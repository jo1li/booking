import _ from 'lodash';
import ActionCreators from './actionCreators';
import * as requests from '../request/requests';
import { getFormData } from '../utils/formHelpers';
import { updateProfile } from './profile';

// TODO: error handling

export function createArtistPhoto({ artistId, photoObject }) {
    return (dispatch, getState) => {
        const photoObjectCopy = _.clone(photoObject);
        photoObjectCopy.data = JSON.stringify(JSON.stringify(photoObject.data));

        const formData = getFormData(photoObjectCopy);

        return requests.createPhoto({artistId, formData})
            .then(res => {
                dispatch(ActionCreators.photosCreateOrUpdate(res.data));
                return res;
            })
    }
}

export function updateArtistPhoto({id, artistId, order, coverPhotoStyles}) {
    const props = {
        order,
        data: JSON.stringify({coverPhotoStyles}),
    };
    return (dispatch, getState) => {
        return requests.updatePhoto({artistId, photoId: id, props}).then(res => {
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
