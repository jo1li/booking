import ActionCreators from './actionCreators';
import * as requests from '../request/requests';
import crudConfigs from '../reducers/crudConfigs';

// TODO: error handling

export function createMusicianVideo({musicianId, code}) {
    return (dispatch, getState) => {
        const request = requests.createVideo({musicianId, code}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data));
        });
        return request;
    }
}

export function updateMusicianVideo({musicianId, videoId, code}) {
    return (dispatch, getState) => {
        const request = requests.updateVideo({musicianId, videoId, code}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data));
        })
    }
}

export function getMusicianVideos({musicianId}) {
    return (dispatch, getState) => {
        const request = requests.getVideos({musicianId}).then(res => {
            dispatch(ActionCreators.videosCreateOrUpdate(res.data.results));
        });
    }
}
