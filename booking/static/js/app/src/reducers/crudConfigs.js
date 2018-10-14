import * as REDUCER_CONSTS from '../constants/reducers';

const {
    AUDIOS,
    PHOTOS,
    PENDING_PHOTOS,
    VIDEOS,
} = REDUCER_CONSTS;

export default {
    [AUDIOS]: {
        key: 'id'
    },
    [PHOTOS]: {
        key: 'id'
    },
    [PENDING_PHOTOS]: {
        key: 'id'
    },
    [VIDEOS]: {
        key: 'id'
    },
}
