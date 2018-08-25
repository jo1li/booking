import ActionCreators from './actionCreators';
import * as requests from '../request/requests';
import crudConfigs from '../reducers/crudConfigs';

// TODO: error handling
// TODO: autogenerate these actions when adding CRUD configs

export function createArtistAudio({artistId, code, order}) {
    return (dispatch, getState) => {
        return requests.createAudio({artistId, code, order}).then(res => {
            dispatch(ActionCreators.audiosCreateOrUpdate(res.data));
        });
    }
}

export function updateArtistAudio({id, artistId, code, order}) {
    return (dispatch, getState) => {
        return requests.updateAudio({artistId, audioId: id, code, order}).then(res => {
            dispatch(ActionCreators.audiosCreateOrUpdate(res.data));
        })
    }
}

export function getArtistAudios({artistId}) {
    return (dispatch, getState) => {
        return requests.getAudios({artistId}).then(res => {
            dispatch(ActionCreators.audiosCreateOrUpdate(res.data.results));
        });
    }
}

export function destroyArtistAudio({id, artistId}) {
    return (dispatch, getState) => {
        return requests.destroyAudio({artistId, audioId: id}).then(res => {
            dispatch(ActionCreators.audiosDelete(id));
        });
    }
}
