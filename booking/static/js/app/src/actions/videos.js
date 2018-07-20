import ActionCreators from './ActionCreators';
import * as requests from '../request/requests';
import crudConfigs from '../reducers/crudConfigs';

export function createMusicianVideo({musicianId, code}) {
    return (dispatch, getState) => {
        const request = requests.createVideo({musicianId, code}).then(res => {
            // TODO: checking whether res is a 2xx status is built in right?
            dispatch(ActionCreators.videosCreateOrUpdate(res.data));
        });
        return request;
    }
}

export function updateMusicianVideos({musicianId, code}) {
    return (dispatch, getState) => {
        const request = requests.createVideo({musicianId, code}).then(res => {
            console.log(res)

            // TODO: checking whether res is a 2xx status is built in right?
            // const updatedProjectSubmissions = (project.project_submissions || []).concat(res)
            // dispatch(ActionCreators.projectsCreateOrUpdate({
            //     project_key: `project.project_key,
            //     project_submissions: updatedProjectSubmissions,
            // }));
        })
    }
}

export function getMusicianVideos({musicianId}) {
    return (dispatch, getState) => {
        const request = requests.getVideos({musicianId}).then(res => {
            // TODO: checking whether res is a 2xx status is built in right?
            dispatch(ActionCreators.videosCreateOrUpdate(res.data.results));
        });
    }
}
