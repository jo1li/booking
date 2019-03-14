import ActionCreators from './actionCreators';
import * as requests from '../request/requests';

// TODO: error handling

export function getGenres() {
    return (dispatch, getState) => {
        return requests.getGenres().then(res => {
            dispatch(ActionCreators.genresCreateOrUpdate(res.data.results));
        });
    }
}
