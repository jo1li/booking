import ActionCreators from './actionCreators';
import * as requests from '../request/requests';

// TODO: error handling
// TODO: change these to work for photos, which need to be uploaded, then give an src

export function createArtistPhoto({artistId, file, order}, callback) {
    return (dispatch, getState) => {
        return requests.createPhoto({artistId, file, order}
            ).then(res => {
                dispatch(ActionCreators.photosCreateOrUpdate(res.data));
            }).then(() => {
                if(callback) callback();
            });
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
