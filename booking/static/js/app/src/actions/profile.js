import ActionCreators from './actionCreators';
import * as requests from '../request/requests';

// TODO: error handling

export function updateProfile(data, userID) {
    return (dispatch, getState) => {
        return requests.updateUserBio(data, userID).then(res => {
            dispatch(ActionCreators.profileCreateOrUpdate(res.data));
        })
    }
}
