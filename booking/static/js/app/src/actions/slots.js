import ActionCreators from './actionCreators';
import * as requests from '../request/requests';

// TODO: error handling

export function getArtistSlots({artistId}) {
    return (dispatch, getState) => {
        return requests.getSlots({artistId}).then(res => {
            dispatch(ActionCreators.slotsCreateOrUpdate(res.data.results));
        });
    }
}
