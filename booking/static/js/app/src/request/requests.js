import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data));
}

export const getVideos = ({artistId}) => {
    return request.get(`/v1/artists/${artistId}/videos/`);
}

export const updateVideo = ({artistId, videoId, code}) => {
    return request.put(`/v1/artists/${artistId}/videos/${videoId}/`, {code});
}

export const createVideo = ({artistId, code}) => {
    return request.post(`/v1/artists/${artistId}/videos/`, {code});
}

export const getGenres = (data, id) => request.get(`/v1/genres/`);
