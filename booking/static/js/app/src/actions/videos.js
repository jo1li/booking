import ActionCreators from './actionCreators';
import * as requests from '../request/requests';
import crudConfigs from '../reducers/crudConfigs';

// TODO: error handling

export function createArtistVideo({artistId, code}) {
    return (dispatch, getState) => {
        const request = requests.createVideo({artistId, code}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data));
        });
        return request;
    }
}

export function updateArtistVideo({artistId, videoId, code}) {
    return (dispatch, getState) => {
        const request = requests.updateVideo({artistId, videoId, code}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data));
        })
    }
}

export function getArtistVideos({artistId}) {
    return (dispatch, getState) => {
        const request = requests.getVideos({artistId}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data.results));
        });
    }
}

export function destroyArtistVideo({artistId, videoId}) {
    return (dispatch, getState) => {
        const request = requests.destroyVideo({artistId, videoId}).then(res => {
            dispatch(ActionCreators.videosDelete(videoId));
        });
    }
}
