import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data));
}

export const getVideos = ({artistId}) => {
    return request.get(`/v1/artists/${artistId}/videos/`);
}

export const updateVideo = ({artistId, videoId, code, order}) => {
    return request.put(`/v1/artists/${artistId}/videos/${videoId}/`, {code, order});
}

export const createVideo = ({artistId, code, order}) => {
    return request.post(`/v1/artists/${artistId}/videos/`, {code, order});
}

export const destroyVideo = ({artistId, videoId}) => {
    return request.delete(`/v1/artists/${artistId}/videos/${videoId}`);
}

export const getGenres = (data, id) => request.get(`/v1/genres/`);
